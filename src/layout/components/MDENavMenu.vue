<template>
    <nav
        :class="[
            'mde-nav',
            'mde-nav-menu bg-body',
            { active },
        ]"
        @click="handleClick"
    >
        <!-- <div class='mde-nav-flag'></div> -->
        <MDENavTree :data="treeData" :collapseds="collapseds" />
    </nav>
</template>

<script setup lang="ts">
import { shallowReactive, onBeforeMount } from 'vue'
import { treeNodeRegisterId, treeNodeExpand } from '../../utils/tree'
import type { TreeItem } from '../../types'
import MDENavTree from './MDENavTree.vue'
const props = defineProps<{
    data: TreeItem[]
    active: boolean
}>()

const treeData = treeNodeRegisterId(props.data)
const collapseds = shallowReactive(new Set<string>())
// const collapseds = shallowReactive(treeNodeExpand(treeData, location.pathname))
onBeforeMount(() => {

})
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
