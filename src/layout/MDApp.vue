<template>
    <MDEHeader />
    <MDEBanner :title="title" :date-time="dateTime" :birth-time="birthTime" :banner-img="bannerImg" :words="words"
        :minutes="minutes" />
    <div class="mde-nav-wrapper">
        <nav
            class="mde-nav-bar bg-body fs-6 border-bottom border-body-secondary d-flex align-items-center justify-content-between d-xxl-none px-4">
            <div class="point-hover" @click="activeNavMenu = true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                    class="bi bi-filter-left" viewBox="0 0 16 16">
                    <path
                        d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                </svg>
                菜单
            </div>
            <div class="point-hover" @click="activeNavToc = true">
                页面导航
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                    class="bi bi-filter-right" viewBox="0 0 16 16">
                    <path
                        d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5" />
                </svg>
            </div>
        </nav>
        <div :class="['mde-backdrop', { active: activeNavMenu || activeNavToc }]" @click="inactive"></div>
        <MDENavMenu :active="activeNavMenu" :data="navList" />
        <MDENavToc :active="activeNavToc" :data="tocList" />
    </div>
    <main class="mde-main">
        <div class="markdown-body">
            <p class="alert alert-primary" role="alert">最后更新于：2024年10月15日星期二中午11点49分</p><h1>标题</h1><p>在 Markdown 中，用井号 <code>#</code> 来创建标题，<code>#</code>的数量决定了标题的级别， <code>#</code>与文字之间空空格分开。比如，两个个井号 (<code>## 二级标题</code>) 就表示一个<code>二级标题</code>。最多支持 1 ～ 6 个级别的标题，下面展示具体用法。</p><h1 style="
">一级标题</h1><p>注意，一级标题中只有一个一级标题。为什么要这么限制呢？有以下好处：</p><ul><li><p>唯一的一级标题用于<strong>明确当前文档主题</strong>，代表了整个文档的主题或核心内容，使文档结构更加清晰，有助于读者快速理解文档的主要内容和目的。</p></li><li><p><strong>搜索引擎的优化</strong>，搜索引擎通常会将 <code>&lt;h1&gt;</code> 标签中的内容是为页面的主要标题，将其作为关键词进行索引。</p></li><li><p><strong>更好的导航</strong>，帮助读者更好地导航和理解文档结构。</p></li><li><p><strong>一致性和规范性</strong>，遵循共同的规范，使得文档能适配多种环境（如<strong>跨平台</strong>、<strong>屏幕阅读器等辅助技术</strong>），并且能更好地阅读和维护。</p></li><li><p><strong>专业形象</strong>，展示作者对文档结构的重视和对读者体验的关注。</p></li></ul><p>语法如下：</p><div class="mde-code position-relative"><button type="button" class="btn-clipboard position-absolute align-items-center" title="Copy to clipboard!"><small class="me-2 d-none">Copied</small><svg width="1.25em" height="1.25em" style="width:1.25em;height:1.25em;"><use xlink:href="#copy"></use></svg></button><small class="lang position-absolute fw-medium text-body-tertiary">md</small><!--[--><pre><div class="hljs"><span class="hljs-section"># 一级标题</span>
</div></pre><!--]--></div><h2>二级标题</h2><div class="mde-code position-relative"><button type="button" class="btn-clipboard position-absolute align-items-center" title="Copy to clipboard!"><small class="me-2 d-none">Copied</small><svg width="1.25em" height="1.25em" style="width:1.25em;height:1.25em;"><use xlink:href="#copy"></use></svg></button><small class="lang position-absolute fw-medium text-body-tertiary">md</small><!--[--><pre><div class="hljs"><span class="hljs-section">## 二级标题</span>
</div></pre><!--]--></div><h3>三级标题</h3><div class="mde-code position-relative"><button type="button" class="btn-clipboard position-absolute align-items-center" title="Copy to clipboard!"><small class="me-2 d-none">Copied</small><svg width="1.25em" height="1.25em" style="width:1.25em;height:1.25em;"><use xlink:href="#copy"></use></svg></button><small class="lang position-absolute fw-medium text-body-tertiary">md</small><!--[--><pre><div class="hljs"><span class="hljs-section">### 三级标题</span>
</div></pre><!--]--></div><h4>四级标题</h4><div class="mde-code position-relative"><button type="button" class="btn-clipboard position-absolute align-items-center" title="Copy to clipboard!"><small class="me-2 d-none">Copied</small><svg width="1.25em" height="1.25em" style="width:1.25em;height:1.25em;"><use xlink:href="#copy"></use></svg></button><small class="lang position-absolute fw-medium text-body-tertiary">md</small><!--[--><pre><div class="hljs"><span class="hljs-section">#### 四级标题</span>
</div></pre><!--]--></div><h5>五级标题</h5><div class="mde-code position-relative"><button type="button" class="btn-clipboard position-absolute align-items-center" title="Copy to clipboard!"><small class="me-2 d-none">Copied</small><svg width="1.25em" height="1.25em" style="width:1.25em;height:1.25em;"><use xlink:href="#copy"></use></svg></button><small class="lang position-absolute fw-medium text-body-tertiary">md</small><!--[--><pre><div class="hljs"><span class="hljs-section">##### 五级标题</span>
</div></pre><!--]--></div><h6>六级标题</h6><div class="mde-code position-relative"><button type="button" class="btn-clipboard position-absolute align-items-center" title="Copy to clipboard!"><small class="me-2 d-none">Copied</small><svg width="1.25em" height="1.25em" style="width:1.25em;height:1.25em;"><use xlink:href="#copy"></use></svg></button><small class="lang position-absolute fw-medium text-body-tertiary">md</small><!--[--><pre><div class="hljs"><span class="hljs-section">###### 六级标题</span>
</div></pre><!--]--></div><h2>不同级别标题之间的关系</h2><p>在文档中，标题的级别用于表示内容的层次结构。一级标题<code>#</code>是最高级别的标题，通常代表整个文档的主题。二级标题<code>##</code>、三级标题<code>###</code>等则用于进一步细分内容，形成一个清晰的层次结构。每个低级别的标题都属于其上一级标题的内容。</p><h2>实例 写一篇关于“如何制作一杯美味咖啡”的文档</h2><p>文本结构：</p><div class="mde-code position-relative"><button type="button" class="btn-clipboard position-absolute align-items-center" title="Copy to clipboard!"><small class="me-2 d-none">Copied</small><svg width="1.25em" height="1.25em" style="width:1.25em;height:1.25em;"><use xlink:href="#copy"></use></svg></button><small class="lang position-absolute fw-medium text-body-tertiary">md</small><!--[--><pre><div class="hljs"><span class="hljs-section"># 如何制作一杯美味咖啡</span>
这是一篇关于如何制作一杯美味咖啡的指南。

<span class="hljs-section">## 准备材料</span>
在开始之前，你需要准备以下材料：

<span class="hljs-section">### 咖啡豆</span>
<span class="hljs-bullet">-</span> 选择高质量的咖啡豆。
<span class="hljs-bullet">-</span> 推荐使用新鲜烘焙的咖啡豆。

<span class="hljs-section">### 磨豆机</span>
<span class="hljs-bullet">-</span> 选择一台好的磨豆机。
<span class="hljs-bullet">-</span> 确保磨豆机干净且调整到适当的粗细度。

<span class="hljs-section">### 滤纸和咖啡壶</span>
<span class="hljs-bullet">-</span> 准备适合你咖啡壶的滤纸。
<span class="hljs-bullet">-</span> 清洗咖啡壶，确保没有残留物。

<span class="hljs-section">## 制作步骤</span>
按照以下步骤制作你的咖啡：

<span class="hljs-section">### 磨豆</span>
<span class="hljs-bullet">1.</span> 将咖啡豆放入磨豆机。
<span class="hljs-bullet">2.</span> 调整磨豆机的粗细度。
<span class="hljs-bullet">3.</span> 开始磨豆，直到达到所需的粗细度。

<span class="hljs-section">### 加水</span>
<span class="hljs-bullet">1.</span> 在咖啡壶中加入适量的水。
<span class="hljs-bullet">2.</span> 水温应控制在90-96摄氏度之间。

<span class="hljs-section">### 冲泡</span>
<span class="hljs-bullet">1.</span> 将磨好的咖啡粉放入滤纸中。
<span class="hljs-bullet">2.</span> 缓慢倒入热水，让咖啡慢慢滴下。
<span class="hljs-bullet">3.</span> 等待几分钟，直到所有水都通过滤纸。

<span class="hljs-section">### 享用</span>
<span class="hljs-bullet">1.</span> 将冲泡好的咖啡倒入杯中。
<span class="hljs-bullet">2.</span> 根据个人口味添加糖和奶。
<span class="hljs-bullet">3.</span> 享受你的美味咖啡！

<span class="hljs-section">## 小贴士</span>
这里有一些小贴士，帮助你制作更好的咖啡：

<span class="hljs-section">### 选择高质量的咖啡豆</span>
<span class="hljs-bullet">-</span> 选择新鲜烘焙的咖啡豆。
<span class="hljs-bullet">-</span> 避免使用过期或陈旧的咖啡豆。

<span class="hljs-section">### 控制水温</span>
<span class="hljs-bullet">-</span> 水温对咖啡的味道有很大影响。
<span class="hljs-bullet">-</span> 使用温度计确保水温在90-96摄氏度之间。

<span class="hljs-section">### 保持清洁</span>
<span class="hljs-bullet">-</span> 定期清洗磨豆机和咖啡壶。
<span class="hljs-bullet">-</span> 保持工具的清洁可以提升咖啡的质量。
</div></pre><!--]--></div><h1>如何制作一杯美味咖啡</h1><p>这是一篇关于如何制作一杯美味咖啡的指南。</p><blockquote><p><code># 如何制作一杯美味咖啡</code> 这个一级标题 这是整个文档的主题，告诉读者这篇文档是关于什么的。</p></blockquote><h2>准备材料</h2><p>在开始之前，你需要准备以下材料：</p><blockquote><p><code>## 准备材料</code> 这个二级标题表示文档的一个主要部分，即需要准备哪些材料。</p></blockquote><h3>咖啡豆</h3><ul><li><p>选择高质量的咖啡豆。</p></li><li><p>推荐使用新鲜烘焙的咖啡豆。</p></li></ul><blockquote><p>下面的两个 <strong>三级标题</strong> ———— <code>### 咖啡豆</code>、<code>### 磨豆机</code> 是对上面 <strong>二级标题</strong> <code>## 准备材料</code>的进一步细分，具体说明准备的材料。</p></blockquote><h3>磨豆机</h3><ul><li><p>选择一台好的磨豆机。</p></li><li><p>确保磨豆机干净且调整到适当的粗细度。</p></li></ul><h3>滤纸和咖啡壶</h3><ul><li><p>准备适合你咖啡壶的滤纸。</p></li><li><p>清洗咖啡壶，确保没有残留物。</p></li></ul><h2>制作步骤</h2><p>按照以下步骤制作你的咖啡：</p><h3>磨豆</h3><ol><li><p>将咖啡豆放入磨豆机。</p></li><li><p>调整磨豆机的粗细度。</p></li><li><p>开始磨豆，直到达到所需的粗细度。</p></li></ol><h3>加水</h3><ol><li><p>在咖啡壶中加入适量的水。</p></li><li><p>水温应控制在90-96摄氏度之间。</p></li></ol><h3>冲泡</h3><ol><li><p>将磨好的咖啡粉放入滤纸中。</p></li><li><p>缓慢倒入热水，让咖啡慢慢滴下。</p></li><li><p>等待几分钟，直到所有水都通过滤纸。</p></li></ol><h3>享用</h3><ol><li><p>将冲泡好的咖啡倒入杯中。</p></li><li><p>根据个人口味添加糖和奶。</p></li><li><p>享受你的美味咖啡！</p></li></ol><h2>小贴士</h2><p>这里有一些小贴士，帮助你制作更好的咖啡：</p><h3>选择高质量的咖啡豆</h3><ul><li><p>选择新鲜烘焙的咖啡豆。</p></li><li><p>避免使用过期或陈旧的咖啡豆。</p></li></ul><h3>控制水温</h3><ul><li><p>水温对咖啡的味道有很大影响。</p></li><li><p>使用温度计确保水温在90-96摄氏度之间。</p></li></ul><h3>保持清洁</h3><ul><li><p>定期清洗磨豆机和咖啡壶。</p></li><li><p>保持工具的清洁可以提升咖啡的质量。</p></li></ul>
            <p class="alert alert-primary" role="alert">
                {{ mTime }}
            </p>
            <h1>h1 一级</h1>
            <p>文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本</p>
            <h2>h2 二级</h2>
            <p>文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本</p>
            <h3>h3 三级</h3>
            <p>文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本</p>
            <h4>h4 四级</h4>
            <p>文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本</p>
            <h5>h5 五级</h5>
            <p>文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本</p>
            <h6>h6 六级</h6>
            <h2>image</h2>
            <MDEImageGroup :list="[{ src: img350, alt: '350', width: 350, height: 700 }]">
            </MDEImageGroup>
            <hr />
            <h2>image</h2>
            <MDEImageGroup :list="[
                { src: img350, alt: '350_1', width: 350, height: 700 },
                { src: img350, alt: '350_2', width: 350, height: 700 },
                { src: img350, alt: '350_3', width: 350, height: 700 },
            ]">
            </MDEImageGroup>
            <h2 id="title2-1">code</h2>
            <hr />
            <MDECode lang="js">
                <pre><div class="hljs"><span class="hljs-keyword">var</span> getUserInfo = <span class="hljs-keyword">function</span>(<span class="hljs-params">userId, callback</span>) {
    $.<span class="hljs-title function_">ajax</span>(<span class="hljs-string">&#x27;http://xxx?&#x27;</span> + userId, <span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) {
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> callback === <span class="hljs-string">&#x27;function&#x27;</span>) {
            <span class="hljs-title function_">callback</span>(data);
        }
    });
}

<span class="hljs-title function_">getUserInfo</span>(<span class="hljs-number">13157</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(data.<span class="hljs-property">userName</span>);
});
</div></pre>
            </MDECode>
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
            <hr />
            <BButton variant="outline-primary">Primary</BButton>
            <BButton variant="outline-secondary">Secondary</BButton>
            <BButton variant="outline-success">Success</BButton>
            <BButton variant="outline-danger">Danger</BButton>
            <BButton variant="outline-warning">Warning</BButton>
            <BButton variant="outline-info">Info</BButton>
            <BButton variant="outline-light">Light</BButton>
            <BButton variant="outline-dark">Dark</BButton>
            <hr />
            <BBadge variant="primary">Primary</BBadge>
            <BBadge variant="secondary">Secondary</BBadge>
            <BBadge variant="success">Success</BBadge>
            <BBadge variant="danger">Danger</BBadge>
            <BBadge variant="warning">Warning</BBadge>
            <BBadge variant="info">Info</BBadge>
            <BBadge variant="light">Light</BBadge>
            <BBadge variant="dark">Dark</BBadge>
            <hr />
            <BAlert :model-value="true" variant="primary">Primary Alert</BAlert>
            <BAlert :model-value="true" variant="secondary">Secondary Alert</BAlert>
            <BAlert :model-value="true" variant="success">Success Alert</BAlert>
            <BAlert :model-value="true" variant="danger">Danger Alert</BAlert>
            <BAlert :model-value="true" variant="warning">Warning Alert</BAlert>
            <BAlert :model-value="true" variant="info">Info Alert</BAlert>
            <BAlert :model-value="true" variant="light">Light Alert</BAlert>
            <BAlert :model-value="true" variant="dark">Dark Alert</BAlert>
            <hr />
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
    <footer>footer</footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BButton, BAlert, BBadge } from 'bootstrap-vue-next'
import MDEHeader from './components/MDEHeader.vue'
import MDENavMenu from './components/MDENavMenu.vue'
import MDENavToc from './components/MDENavToc.vue'
import MDECode from './components/MDECode.vue'
import MDEImageGroup from './components/MDEImageGroup.vue'
import MDEBanner from './components/MDEBanner.vue'
import type { TreeItem } from '../types/index'
import img350 from './imgs/350.jpg'

const navList: TreeItem[] = [
    { text: '介绍', href: '/info', id: '0' },
    {
        text: '安装',
        items: [
            { text: '环境', href: '/env', id: '1-0' },
            { text: '软件', href: '/soft', id: '1-1' },
        ],
        id: '1',
    },
    {
        text: '极端案例场景',
        items: [
            {
                text: '长标题',
                items: [
                    {
                        text: 'English and how to use this content',
                        href: '/asd',
                        id: '2-0-0',
                    },
                    {
                        text: 'very long, very long, very long, very very very very very very very long long long long',
                        href: '/#/',
                        id: '2-0-1',
                    },
                    {
                        text: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。',
                        href: '/#/',
                        id: '2-0-2',
                    },
                ],
                id: '2-0',
            },
            {
                text: 'English and how to use this content',
                href: '/#/',
                id: '2-1',
            },
            {
                text: 'very long, very long, very long, very very very very very very very long long long long',
                href: '/#/',
                id: '2-2',
            },
            {
                text: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。',
                href: '/#/',
                id: '2-3',
            },
        ],
        id: '2',
    },
    { text: '命令', id: '3' },
    {
        text: '组件',
        items: [
            { text: '文字', href: '/#', id: '4-0' },
            { text: '按钮', href: '/#', id: '4-1' },
            { text: '图片', href: '/#', id: '4-2' },
            { text: '卡片', href: '/#', id: '4-3' },
            { text: '手风琴', href: '/#', id: '4-4' },
            { text: '折叠', href: '/#', id: '4-5' },
            { text: '提示框', href: '/#', id: '4-6' },
        ],
        id: '4',
    },
]
const tocList: TreeItem[] = [
    {
        text: 'title1',
        href: '#',
        items: [
            { text: 'ttile1-1', id: '0-0' },
            { text: 'ttile1-2', id: '0-1' },
            { text: 'ttile1-3', id: '0-2' },
        ],
        id: '0',
    },
    {
        text: 'title2',
        items: [
            {
                text: 'ttile2-1',
                href: '#title2-1',
                id: '1-0',
                isFocusable: true,
            },
            { text: 'ttile2-2', id: '1-1' },
            { text: 'ttile2-3', id: '1-2' },
        ],
        id: '1',
    },
]
const activeNavMenu = ref(false)
const activeNavToc = ref(false)
function inactive() {
    activeNavMenu.value = false
    activeNavToc.value = false
}
const title = "I'm title !!!! The h1!"
const dateTime = '2024-10-08 15:50'
const birthTime = 'Tuesday, October 8, 2024 3:51 PM'
const words = '300'
const minutes = 6
const bannerImg = '/imgs/default.jpg'
const mTime = 'Tuesday, October 8, 2024 4:18 PM'
</script>
