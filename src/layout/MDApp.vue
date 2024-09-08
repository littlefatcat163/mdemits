<template>
    <Button label="Primary" @click="test1"/>
    <Button label="Secondary" severity="secondary" />
    <Button label="Success" severity="success" />
    <Button label="Info" severity="info" />
    <Button label="Warn" severity="warn" />
    <Button label="Help" severity="help" />
    <Button label="Danger" severity="danger" />
    <Button label="Contrast" severity="contrast" />
    <hr>
    <MDTest />
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import MDTest from './components/MDTest.vue'
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

function test1() {
    const element = document.querySelector('html');
    element!.classList.toggle('p-dark');
}
</script>
