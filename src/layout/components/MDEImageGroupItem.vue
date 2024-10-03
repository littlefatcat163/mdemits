<script setup lang="ts">
withDefaults(
    defineProps<{
        alt: string
        src: string
        index: number
        isAdapt?: boolean
    }>(),
    {
        isAdapt: true,
    }
)
</script>

<template>
    <div v-if="isAdapt" class="col">
        <div class="image-adapter">
            <div>
                <img :alt="alt" :src="src" :data-index="index" />
            </div>
        </div>
    </div>
    <img v-else :alt="alt" :src="src" :data-index="index" />
</template>

<style lang="stylus">
.image-adapter
    padding-bottom 100%
    position relative
    > div
        width 100%
        height 100%
        position absolute
        left 0
        top 0
        z-index 2
        > img
            width 100%
            height 100%
            object-fit cover
</style>
