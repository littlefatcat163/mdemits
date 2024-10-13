<template>
    <MDEHeader />
    <MDEBanner :title="title" :date-time="dateTime" :birth-time="birthTime" :banner-img="bannerImg" :words="words" :minutes="minutes" />
    <div class="mde-nav-wrapper">
        <nav class="mde-nav-bar bg-body fs-6 border-bottom border-body-secondary d-flex align-items-center justify-content-between d-xxl-none px-4">
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
        <MDENavToc :active="activeNavToc" :data="tocList" />
    </div>
    <main class="mde-main">
        <div>
            <p class="alert alert-primary" role="alert">
                {{ mTime }}
            </p>
            <!-- Markdown -->
        </div>
    </main>
    <footer>footer</footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BButton, BAlert, BBadge, MDEHeader, MDENavMenu, MDENavToc, MDECode, MDEImageGroup, MDEImageGroupItem, MDEBanner } from 'ui'
const activeNavMenu = ref(false)
const activeNavToc = ref(false)
function inactive() {
    activeNavMenu.value = false
    activeNavToc.value = false
}
/* data */
</script>
