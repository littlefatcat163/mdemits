<template>
    <ul class="list-unstyled">
        <template v-for="{ text, href, items } in navList">
            <li class="py-1">
                <a v-if="href" class="cursor-pointer opacity-65 hover:text-primary hover:opacity-100" :href="href">{{ text }}</a>
                <span v-else class="cursor-pointer font-medium">{{ text }}</span>
                <MDNavTree v-if="items" :navList="items" class="ps-3" />
            </li>
        </template>
    </ul>
</template>

<script setup lang="ts">
import type { NavTreeItem } from '../../types'
defineProps<{
    navList: NavTreeItem[]
}>()
const classes = () => {
    return []
}
</script>
