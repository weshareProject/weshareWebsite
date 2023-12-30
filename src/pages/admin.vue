<template>
    <AdminHeader>
    </AdminHeader>

    <AdminAside :processedData="processedData" @noteSelected="updateSelectedNote" >
    </AdminAside>

    <AdminMain :selectedNote="selectedNote" >
    </AdminMain>

</template>

<script setup>
// 引入组件
import AdminHeader from '@/components/AdminHeader.vue';
import AdminAside from '@/components/AdminAside.vue';
import AdminMain from '@/components/AdminMain.vue';
import { reactive, onMounted,ref } from 'vue';
import { getAllNotes } from '@/api/notes'  
import { showMessage } from '@/utils/message' // 消息报告

// 笔记项目
const notes = reactive({ list: [] });
const processedData = reactive([]);

// 代理服务器网站（解决跨域问题）
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

// 当前选中显示在主页面上的笔记数据
const selectedNote = ref(null); 

// 定义事件处理函数
const updateSelectedNote = (note) => {
  selectedNote.value = note;
};

// 在获取笔记后进行处理
onMounted(() => {
    getAllNotes().then((res) => {
        if (res.code === 200 || res.code === 201) {
            notes.list = res.data;
            console.log("处理前：")
            console.log(notes.list)

            // 处理笔记数据
            const processedData = processNotes(notes.list);
            console.log("处理后：")
            console.log(processedData); // 处理后的数据
        } else {
            let message = res.message;
            showMessage(message, 'error');
            console.log(message);
        }
    });
});


// 获取单个 URL 的标题
const getTitleFromURL = async (url) => {
    try {
        const response = await fetch(CORS_PROXY + url);
        if (response.ok) {
            const html = await response.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const title = doc.querySelector('title').textContent;
            return title;
        }
        throw new Error('Network response was not ok.');
    } catch (error) {
        console.error(`Error fetching title for ${url}:`, error);
        return 'Untitled';
    }
};


// 加工数据
const processNotes = async (notesList) => {
    const urlMap = new Map();

    notesList.forEach((note) => {
        const { url, tempId, updateTime } = note;

        if (urlMap.has(url)) {
            const existingNote = urlMap.get(url);

            if (new Date(updateTime) > new Date(existingNote.updateTime)) {
                urlMap.set(url, { ...note });
            }
        } else {
            urlMap.set(url, { ...note });
        }
    });

    const urlStatistics = [];
    for (const [url, value] of urlMap.entries()) {
        const { contents } = await getContentSummary(url, notesList);

        const urlInfo = {
            url,
            title: await getTitleFromURL(url),
            count: Array.from(notesList).filter((note) => note.url === url).length,
            latestUpdate: new Date(value.updateTime).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }),
            contents: contents.map((content) => ({
                ...content,
                tempId: notesList.find((note) => note.url === url && note.content === content.content)?.tempId || '',
            })).sort((a, b) => {
                if (a.top === b.top) {
                    return a.left - b.left;
                }
                return a.top - b.top;
            }),
        };
        urlStatistics.push(urlInfo);
    }

    urlStatistics.sort((a, b) => new Date(b.latestUpdate) - new Date(a.latestUpdate));

    processedData.length = 0;
    processedData.push(...urlStatistics);

    return urlStatistics;
};


const getContentSummary = async (url, notesList) => {
    const contents = notesList
        .filter((note) => note.url === url)
        .map((note) => ({
            content: note.content,
            tempId: note.tempId,
            updateTime: new Date(note.updateTime).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }),
            top: JSON.parse(note.position).top,
            left: JSON.parse(note.position).left,
        }));

    return { contents };
};

</script>