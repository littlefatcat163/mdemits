<template>
    <ul class="pl-6">
        <template v-for="{ title, href, children } in tocList">
            <li>
                <a :class="classes(title)" :href="href">{{ title }}</a>
                <MDRightNav v-if="children" :tocList="children" />
            </li>
        </template>
    </ul>
</template>

<script setup lang="ts">
import type { TocItem } from '../../types'
defineProps<{
    tocList: TocItem[]
}>()
const cssPrefix = 'md-rightnav__item'
const classes = (title: string) => {
    return [cssPrefix, title === 'title1' && `${cssPrefix}--acitve`]
}
</script>
