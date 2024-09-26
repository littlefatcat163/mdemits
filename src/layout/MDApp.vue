<template>
    <header class="mde-header border-bottom border-body-secondary text-light d-flex align-items-center px-4">
        <div class="fw-bold fs-2 flex-fill" role="button">MDEMITS</div>
        <div class="d-grid column-gap-3" style="grid-template-columns: auto auto auto;">
            <svg class="point-hover" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z"/>
                <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z"/>
                <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z"/>
                <path d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z"/>
                <path d="M12 9h2V8h-2z"/>
            </svg>
            <svg class="point-hover" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
            <div class="mde-theme-switch" role="button" @click="toggleTheme">
                <svg class="point-hover" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                </svg>
                <svg class="point-hover" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
                    <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
                </svg>
            </div>
        </div>
    </header>
    <nav class="mde-nav-bar bg-body fs-6 border-bottom border-body-secondary d-flex align-items-center justify-content-between d-xl-none px-4">
        <div class="point-hover" @click="activeNavMenu = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-filter-left" viewBox="0 0 16 16">
                <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
            </svg>
            菜单
        </div>
        <div class="point-hover" @click="activeNavToc = true">
            页面导航
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-filter-right" viewBox="0 0 16 16">
                <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5"/>
            </svg>
        </div>
    </nav>
    <div
        :class="['mde-backdrop', { active: activeNavMenu || activeNavToc }]"
        @click="inactive"
    ></div>
    <MDENavMenu :active="activeNavMenu" :data="navList" />
    <main class="mde-main">
        <div>
            <BButton variant="primary">Primary</BButton>
            <BButton variant="secondary">Secondary</BButton>
            <BButton variant="success">Success</BButton>
            <BButton variant="danger">Danger</BButton>
            <BButton variant="warning">Warning</BButton>
            <BButton variant="info">Info</BButton>
            <BButton variant="light">Light</BButton>
            <BButton variant="dark">Dark</BButton>
            <hr>
            <BButton variant="outline-primary">Primary</BButton>
            <BButton variant="outline-secondary">Secondary</BButton>
            <BButton variant="outline-success">Success</BButton>
            <BButton variant="outline-danger">Danger</BButton>
            <BButton variant="outline-warning">Warning</BButton>
            <BButton variant="outline-info">Info</BButton>
            <BButton variant="outline-light">Light</BButton>
            <BButton variant="outline-dark">Dark</BButton>
            <hr>
            <BBadge variant="primary">Primary</BBadge>
            <BBadge variant="secondary">Secondary</BBadge>
            <BBadge variant="success">Success</BBadge>
            <BBadge variant="danger">Danger</BBadge>
            <BBadge variant="warning">Warning</BBadge>
            <BBadge variant="info">Info</BBadge>
            <BBadge variant="light">Light</BBadge>
            <BBadge variant="dark">Dark</BBadge>
            <hr>
            <BAlert :model-value="true" variant="primary">Primary Alert</BAlert>
            <BAlert :model-value="true" variant="secondary">Secondary Alert</BAlert>
            <BAlert :model-value="true" variant="success">Success Alert</BAlert>
            <BAlert :model-value="true" variant="danger">Danger Alert</BAlert>
            <BAlert :model-value="true" variant="warning">Warning Alert</BAlert>
            <BAlert :model-value="true" variant="info">Info Alert</BAlert>
            <BAlert :model-value="true" variant="light">Light Alert</BAlert>
            <BAlert :model-value="true" variant="dark">Dark Alert</BAlert>
            <hr>
            <p class="text-primary">.text-primary</p>
            <p class="text-primary-emphasis">.text-primary-emphasis</p>
            <p class="text-secondary">.text-secondary</p>
            <p class="text-secondary-emphasis">.text-secondary-emphasis</p>
            <p class="text-success">.text-success</p>
            <p class="text-success-emphasis">.text-success-emphasis</p>
            <p class="text-danger">.text-danger</p>
            <p class="text-danger-emphasis">.text-danger-emphasis</p>
            <p class="text-warning bg-dark">.text-warning</p>
            <p class="text-warning-emphasis">.text-warning-emphasis</p>
            <p class="text-info bg-dark">.text-info</p>
            <p class="text-info-emphasis">.text-info-emphasis</p>
            <p class="text-light bg-dark">.text-light</p>
            <p class="text-light-emphasis">.text-light-emphasis</p>
            <p class="text-dark bg-white">.text-dark</p>
            <p class="text-dark-emphasis">.text-dark-emphasis</p>

            <p class="text-body">.text-body</p>
            <p class="text-body-emphasis">.text-body-emphasis</p>
            <p class="text-body-secondary">.text-body-secondary</p>
            <p class="text-body-tertiary">.text-body-tertiary</p>

            <p class="text-black bg-white">.text-black</p>
            <p class="text-white bg-dark">.text-white</p>
            <p class="text-black-50 bg-white">.text-black-50</p>
            <p class="text-white-50 bg-dark">.text-white-50</p>
        </div>
    </main>
    <MDENavToc :active="activeNavToc" :data="tocList" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BButton, BAlert, BBadge } from 'bootstrap-vue-next'
import MDENavMenu from './components/MDENavMenu.vue'
import MDENavToc from './components/MDENavToc.vue'
import type { TreeItem } from '../types'
const navList: TreeItem[] = [
    {
        text: '介绍',
        href: '/info'
    },
    {
        text: '安装',
        items: [
            {
                text: '环境',
                href: '/env'
            },
            {
                text: '软件',
                href: '/soft'
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
                        href: '/asd'
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
const tocList: TreeItem[] = [
    {
        text: 'title1',
        href: '#',
        items: [
            {
                text: 'ttile1-1',
            },
            {
                text: 'ttile1-2',
            },
            {
                text: 'ttile1-3',
            },
        ],
    },
    {
        text: 'title2',
        items: [
            {
                text: 'ttile2-1',
            },
            {
                text: 'ttile2-2',
            },
            {
                text: 'ttile2-3',
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
let isDark = false
function toggleTheme() {
    isDark = !isDark
    document.querySelector('html')?.setAttribute('data-bs-theme', isDark ? 'dark' : 'light')
}
</script>
