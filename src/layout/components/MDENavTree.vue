<template>
    <ul class="list-unstyled mde-nav-tree">
        <template v-for="{ text, href, items, id, isFocusable } in data">
            <li class="py-1">
                <a
                    v-if="href"
                    role="button"
                    :class="[
                        'link-offset-2',
                        'link-underline',
                        'link-underline-opacity-0',
                        { 'is-focusable': isFocusable },
                    ]"
                    :href="href"
                    >{{ text }}</a
                >
                <span v-else role="button" class="fw-medium" :data-id="id">{{
                    text
                }}</span>
                <MDENavTree
                    v-if="items"
                    :data="items"
                    :collapseds="collapseds"
                    :class="['ps-3', { 'd-none': !collapseds.has(id!) }]"
                />
            </li>
        </template>
    </ul>
</template>

<script setup lang="ts">
import type { TreeItem } from '../../types'
defineProps<{
    data: TreeItem[]
    collapseds: Set<string>
}>()
</script>

<style lang="stylus">
.mde-nav-tree
    li [role=button]
        color var(--bs-body-color)
        opacity 0.65
        &:hover,&.is-focusable
            opacity 1
            --bs-link-underline-opacity 1
            color var(--bs-primary-text-emphasis)
</style>
