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
        <MDNavTree :navList="navList" />
    </nav>
    <main class="mde-main">
        
        <hr>
        <p>Button</p>
        <Button label="Primary" />
        <Button label="Secondary" severity="secondary" />
        <Button label="Success" severity="success" />
        <Button label="Info" severity="info" />
        <Button label="Warn" severity="warn" />
        <Button label="Help" severity="help" />
        <Button label="Danger" severity="danger" />
        <Button label="Contrast" severity="contrast" />
        <hr>
        <p>Message</p>
        <Message severity="success">Success Message</Message>
        <Message severity="info">Info Message</Message>
        <Message severity="warn">Warn Message</Message>
        <Message severity="error">Error Message</Message>
        <Message severity="secondary">Secondary Message</Message>
        <Message severity="contrast">Contrast Message</Message>
        <hr>
        <p>Badge</p>
        <Badge value="2"></Badge>
        <Badge value="6" severity="secondary"></Badge>
        <Badge value="8" severity="success"></Badge>
        <Badge value="4" severity="info"></Badge>
        <Badge value="9" severity="warn"></Badge>
        <Badge value="3" severity="danger"></Badge>
        <Badge value="5" severity="contrast"></Badge>
        <hr>
        <p>Tag</p>
        <Tag value="Primary"></Tag>
        <Tag severity="secondary" value="Secondary"></Tag>
        <Tag severity="success" value="Success"></Tag>
        <Tag severity="info" value="Info"></Tag>
        <Tag severity="warn" value="Warn"></Tag>
        <Tag severity="danger" value="Danger"></Tag>
        <Tag severity="contrast" value="Contrast"></Tag>
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
import Message from 'primevue/message'
import Badge from 'primevue/badge'
import Tag from 'primevue/tag'
import { PrimeIcons } from '@primevue/core/api'
import MDNavTree from './components/MDNavTree.vue'
const themeIcon = ref(PrimeIcons.SUN)
import type { TocItem, NavTreeItem } from '../types'
const navList: NavTreeItem[] = [
    {
        text: '介绍',
        href: '/#'
    },
    {
        text: '安装',
        items: [
            {
                text: '环境',
                href: '/#/'
            },
            {
                text: '软件',
                href: '/#/'
            }
        ]
    },
    {
        text: '极端案例场景',
        items: [
            {
                text: '长标题',
                items: [
                    {
                        text: 'English and how to use this content',
                        href: '/#/'
                    },
                    {
                        text: 'very long, very long, very long, very very very very very very very long long long long',
                        href: '/#/'
                    },
                    {
                        text: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。',
                        href: '/#/'
                    }
                ]
            },
            {
                text: 'English and how to use this content',
                href: '/#/'
            },
            {
                text: 'very long, very long, very long, very very very very very very very long long long long',
                href: '/#/'
            },
            {
                text: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。',
                href: '/#/'
            }
        ]
    },
    {
        text: '命令'
    },
    {
        text: '组件',
        items: [
            {
                text: '文字',
                href: '/#'
            },
            {
                text: '按钮',
                href: '/#'
            },
            {
                text: '图片',
                href: '/#'
            },
            {
                text: '卡片',
                href: '/#'
            },
            {
                text: '手风琴',
                href: '/#'
            },
            {
                text: '折叠',
                href: '/#'
            },
            {
                text: '提示框',
                href: '/#'
            }
        ]
    }
]
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
</script>
