<script setup lang="ts">
import type { ImageGroupItem } from '../../types'
import MDEImageGroupItem from './MDEImageGroupItem.vue'
import PhotoswipeInstance from './PhotoswipeInstance'
const props = withDefaults(
    defineProps<{
        rowCol?: number
        list: ImageGroupItem[]
    }>(),
    {
        rowCol: 3,
    }
)
const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.tagName === 'IMG') {
        const index = Number.parseInt(target.getAttribute('data-index')!)
        PhotoswipeInstance().loadAndOpen(index, props.list)
    }
}
</script>

<template>
    <figure class="mde-image-group" @click="handleClick">
        <template v-if="list.length === 1">
            <MDEImageGroupItem
                :src="list[0].src"
                :alt="list[0].alt"
                :isAdapt="false"
                :index="0"
            />
        </template>
        <div v-else class="row gx-2 gy-2" :class="`row-cols-${rowCol}`">
            <template v-for="({ src, alt }, index) in list">
                <MDEImageGroupItem :alt="alt" :src="src" :index="index" />
            </template>
        </div>
    </figure>
</template>

<style lang="stylus">
.mde-image-group
    margin 1rem auto
    > img:only-child
        width 100%
    img
        cursor pointer
.mde-lightbox-caption
    position absolute
    bottom 2vh
    font-weight bolder
    width 100vw
    display flex
    justify-content center
    > div
        background-color #00000053
        padding 0.2em 0.6em
        color var(--bs-light)
</style>
