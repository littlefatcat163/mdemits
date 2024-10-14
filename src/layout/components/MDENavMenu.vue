<template>
    <nav :class="['mde-nav', 'mde-nav-menu bg-body', { active }]" @click="handleClick">
        <!-- <div class='mde-nav-flag'></div> -->
        <MDENavTree :data="data" :collapseds="collapseds" />
    </nav>
</template>

<script setup lang="ts">
import { shallowReactive } from 'vue'
import { treeNodeExpand } from '../../utils/tree'
import { isBrowser } from '../../utils/runEnv'
import type { TreeItem } from '../../types/index'
import MDENavTree from './MDENavTree.vue'
const props = defineProps<{
    data: TreeItem[]
    active: boolean
}>()

const collapseds = isBrowser
    ? shallowReactive(treeNodeExpand(props.data, location.pathname))
    : shallowReactive(new Set<string>())
const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.tagName === 'SPAN') {
        const id = target.getAttribute('data-id')!
        if (collapseds.has(id)) {
            collapseds.delete(id)
        } else {
            collapseds.add(id)
        }
    }
}
</script>
