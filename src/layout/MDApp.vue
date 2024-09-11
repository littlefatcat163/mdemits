<template>
    <header class="mde-header">
        <Toolbar>
            <template #start>
                <Button label="MDEMITS" text size="large" style="--p-button-lg-font-size: 1.25rem"></Button>
            </template>
            <template #end>
                <div class="hidden md:block">
                    <Button
                        :icon="PrimeIcons.QRCODE"
                        severity="secondary"
                        size="large"
                        text
                        aria-label="Qrcode"
                    ></Button>
                    <Button
                        :icon="PrimeIcons.SEARCH"
                        severity="secondary"
                        size="large"
                        text
                        aria-label="Search"
                    ></Button>
                    <Button
                        :icon="themeIcon"
                        severity="secondary"
                        size="large"
                        text
                        aria-label="Filter"
                        @click="toggleTheme"
                    ></Button>
                </div>
            </template>
        </Toolbar>
    </header>
    <Toolbar class="mde-nav-bar">
        <template #start>
            <Button
                :icon="PrimeIcons.ALIGN_LEFT"
                severity="secondary"
                size="small"
                text
                aria-label="Bars"
                label="菜单"
                @click="toActiveNav"
            ></Button>
        </template>
        <template #end>
            <Button
                :icon="PrimeIcons.ALIGN_RIGHT"
                iconPos="right"
                severity="secondary"
                size="small"
                text
                aria-label="Toc"
                label="页面导航"
            ></Button>
        </template>
    </Toolbar>
    <div :class="['mde-backdrop', { active: activeNav }]" @click="toActiveNav"></div>
    <nav :class="['mde-nav', { active: activeNav }]">
        <ul>
            <li v-for="i in 60">li-{{ i }}</li>
        </ul>
    </nav>
    <main class="mde-main">
        <p v-for="i in 90">
            I'm p!!!! {{ i }}
        </p>
    </main>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import { PrimeIcons } from '@primevue/core/api'
const themeIcon = ref(PrimeIcons.SUN)
import type { TocItem } from '../types'
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
const activeNav = ref(false)
function toActiveNav() {
    activeNav.value = !activeNav.value
}
function toggleTheme() {
    const element = document.querySelector('html')
    element!.classList.toggle('p-dark')
    themeIcon.value = themeIcon.value === PrimeIcons.SUN ? PrimeIcons.MOON : PrimeIcons.SUN
}
</script>
