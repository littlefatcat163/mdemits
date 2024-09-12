<template>
    <header class="mde-header">
        <Toolbar>
            <template #start>
                <Button
                    label="MDEMITS"
                    text
                    size="large"
                    style="--p-button-lg-font-size: 1.25rem"
                ></Button>
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
                @click="activeNavMenu = true"
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
                @click="activeNavToc = true"
            ></Button>
        </template>
    </Toolbar>
    <div
        :class="['mde-backdrop', { active: activeNavMenu || activeNavToc }]"
        @click="inactive"
    ></div>
    <nav :class="['mde-nav', 'mde-nav-menu', { active: activeNavMenu }]">
        <Tree :value="nodes" v-model:selection-keys="selections" selectionMode="single" highlightOnSelect>
            <template #nodeicon></template>
            <template #nodetoggleicon></template>
            <template #default="slotProps">
                <b>{{ slotProps.node.label }}</b>
            </template>
            <template #url="slotProps">
                <a target="_blank" rel="noopener noreferrer">{{ slotProps.node.label }}</a>
            </template>
        </Tree>
        <Accordion multiple expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
            <AccordionPanel value="0">
                <AccordionHeader>
                    <span class="flex items-center gap-2 w-full">
                        <span class="font-bold whitespace-nowrap"
                            >Amy Elsner</span
                        >
                    </span>
                </AccordionHeader>
                <AccordionContent>
                    <Tree :value="nodes">
                        <template #default="slotProps">
                            <b>{{ slotProps.node.label }}</b>
                        </template>
                        <template #url="slotProps">
                            <a target="_blank" rel="noopener noreferrer">{{ slotProps.node.label }}</a>
                        </template>
                    </Tree>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="1">
                <AccordionHeader>
                    <span class="flex items-center gap-2 w-full">
                        <span class="font-bold whitespace-nowrap"
                            >Onyama Limba</span
                        >
                    </span>
                </AccordionHeader>
                <AccordionContent>
                    <p class="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit, sed quia consequuntur magni dolores eos
                        qui ratione voluptatem sequi nesciunt. Consectetur,
                        adipisci velit, sed quia non numquam eius modi.
                    </p>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="2">
                <AccordionHeader>
                    <span class="flex items-center gap-2 w-full">
                        <span class="font-bold whitespace-nowrap"
                            >Ioni Bowcher</span
                        >
                    </span>
                </AccordionHeader>
                <AccordionContent>
                    <p class="m-0">
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi
                        sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis
                        est et expedita distinctio. Nam libero tempore, cum
                        soluta nobis est eligendi optio cumque nihil impedit quo
                        minus.
                    </p>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    </nav>
    <main class="mde-main">
        <p v-for="i in 90">I'm p!!!! {{ i }} I'm p!!!! I'm p!!!! I'm p!!!! I'm p!!!! I'm p!!!! I'm p!!!! I'm p!!!! I'm p!!!! I'm p!!!! I'm p!!!! I'm p!!!! I'm p!!!! I'm p!!!! I'm p!!!! </p>
    </main>
    <nav :class="['mde-nav', 'mde-nav-toc', { active: activeNavToc }]">
        <ul>
            <li v-for="i in 60">li-{{ i }}</li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import Tree from 'primevue/tree'
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
const activeNavMenu = ref(false)
const activeNavToc = ref(false)
function inactive() {
    activeNavMenu.value = false
    activeNavToc.value = false
}
function toggleTheme() {
    const element = document.querySelector('html')
    element!.classList.toggle('p-dark')
    themeIcon.value =
        themeIcon.value === PrimeIcons.SUN ? PrimeIcons.MOON : PrimeIcons.SUN
}
const selections = ref([])
const nodes = ref([
    {
        key: '-1',
        label: 'empty',
        type: 'url'
    },
    {
        key: '0',
        label: 'Introduction',
        children: [
            { key: '0-0', label: 'What is Vue.js?', data: 'https://vuejs.org/guide/introduction.html#what-is-vue', type: 'url' },
            { key: '0-1', label: 'Quick Start', data: 'https://vuejs.org/guide/quick-start.html#quick-start', type: 'url' },
            { key: '0-2', label: 'Creating a Vue Application', data: 'https://vuejs.org/guide/essentials/application.html#creating-a-vue-application', type: 'url' },
            { key: '0-3', label: 'Conditional Rendering', data: 'https://vuejs.org/guide/essentials/conditional.html#conditional-rendering', type: 'url' }
        ]
    },
    {
        key: '1',
        label: 'Components In-Depth',
        children: [
            { 
                key: '1-0',
                label: 'Component Registration',
                data: 'https://vuejs.org/guide/components/registration.html#component-registration',
                type: 'url',
                children: [
                    {
                        key: '1-0-0',
                        label: 'Component Registration',
                        data: 'https://vuejs.org/guide/components/registration.html#component-registration',
                        type: 'url',
                    },
                    {
                        key: '1-0-1',
                        label: 'Component Registration',
                        data: 'https://vuejs.org/guide/components/registration.html#component-registration',
                        type: 'url',
                    }
                ]
            },
            { key: '1-1', label: 'Props', data: 'https://vuejs.org/guide/components/props.html#props', type: 'url' },
            { key: '1-2', label: 'Components Events', data: 'https://vuejs.org/guide/components/events.html#component-events', type: 'url' },
            { key: '1-3', label: 'Slots', data: 'https://vuejs.org/guide/components/slots.html#slots', type: 'url' }
        ]
    }
])
</script>
