<template>
    <p>文字内容</p>
    <var-space :size="['10rem', '10rem']">
        <var-button>默认按钮</var-button>
        <var-button type="primary">主要按钮</var-button>
        <var-button type="info">信息按钮</var-button>
        <var-button type="success">成功按钮</var-button>
        <var-button type="warning">警告按钮</var-button>
        <var-button type="danger">危险按钮</var-button>
    </var-space>
    <var-space align="center" :size="[10, 10]">
        <var-button type="primary">常规按钮</var-button>
        <var-button type="success" size="small">小型按钮</var-button>
        <var-button type="warning" size="mini">迷你按钮</var-button>
        <var-button type="danger" size="large">大型按钮</var-button>
    </var-space>
</template>

<script setup lang="ts">
import type { TocItem } from '../types'
// import { BButton } from 'bootstrap-vue-next'
// import MDHeader from './components/MDHeader.vue'
// import MDRightNav from './components/MDRightNav.vue'
const tocList: TocItem[] = [
    {
        title: 'title1',
        href: '',
        children: [
            {
                title: 'ttile1-1',
            },
            {
                title: 'ttile1-2',
            },
            {
                title: 'ttile1-3',
            },
        ],
    },
    {
        title: 'title2',
        children: [
            {
                title: 'ttile2-1',
            },
            {
                title: 'ttile2-2',
            },
            {
                title: 'ttile2-3',
            },
        ],
    },
]
</script>
