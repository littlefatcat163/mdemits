<template>
    <MDEHeader />
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
            <h1>h1 一级</h1>
            <p>asdfkjaskdfj</p>
            <hr>
            <h2>h2 二级</h2>
            <h3>h3 三级</h3>
            <h4>h4 四级</h4>
            <h5>h5 五级</h5>
            <h6>h6 六级</h6>
            <h2>image</h2>
            <MDEImageGroup :list="[{src: img350, alt: '350', width: 350, height: 700}]">
            </MDEImageGroup>
            <hr>
            <h2>image</h2>
            <MDEImageGroup :list="[
                {src: img350, alt: '350_1', width: 350, height: 700},
                {src: img350, alt: '350_2', width: 350, height: 700},
                {src: img350, alt: '350_3', width: 350, height: 700}
            ]">
            </MDEImageGroup>
            <p>code</p>
            <hr>
            <MDECode lang="js"><pre><div class="hljs"><span class="hljs-keyword">var</span> getUserInfo = <span class="hljs-keyword">function</span>(<span class="hljs-params">userId, callback</span>) {
    $.<span class="hljs-title function_">ajax</span>(<span class="hljs-string">&#x27;http://xxx?&#x27;</span> + userId, <span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) {
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> callback === <span class="hljs-string">&#x27;function&#x27;</span>) {
            <span class="hljs-title function_">callback</span>(data);
        }
    });
}

<span class="hljs-title function_">getUserInfo</span>(<span class="hljs-number">13157</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(data.<span class="hljs-property">userName</span>);
});
</div></pre></MDECode>
            <MDECode lang="html">
                <pre><div class="hljs"><code><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- and it's easy to individually load additional languages --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span>hljs.highlightAll();<span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></div></pre>
            </MDECode>
            <MDECode lang="javascript">
                <pre><div class="hljs"><code ><span class="hljs-comment">// Using require</span>
<span class="hljs-keyword">const</span> hljs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'highlight.js'</span>);

<span class="hljs-comment">// Using ES6 import syntax</span>
<span class="hljs-keyword">import</span> hljs <span class="hljs-keyword">from</span> <span class="hljs-string">'highlight.js'</span>;</code></div></pre>
            </MDECode>
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
import MDEHeader from './components/MDEHeader.vue'
import MDENavMenu from './components/MDENavMenu.vue'
import MDENavToc from './components/MDENavToc.vue'
import MDECode from './components/MDECode.vue'
import MDEImageGroup from './components/MDEImageGroup.vue'
import MDEImageGroupItem from './components/MDEImageGroupItem.vue'
import type { TreeItem } from '../types'
import img350 from './imgs/350.jpg'

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
</script>
