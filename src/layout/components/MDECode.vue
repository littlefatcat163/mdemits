<template>
    <div class="mde-code position-relative" :class="{'is-copied': isCopied}">
        <button ref="$btn" type="button" class="btn-clipboard position-absolute align-items-center" title="Copy to clipboard!"><small :class="['me-2', {'d-none': !isCopied}]">Copied</small><MDESvg :id="svgId" size="1.25em" /></button>
        <small v-if="lang" class="lang position-absolute fw-medium text-body-tertiary">{{ lang }}</small>
        <slot ref="$code"></slot>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, shallowRef, computed } from 'vue'
import ClipboardJS from 'clipboard'
import MDESvg from './MDESvg.vue'

defineProps<{
    lang?: string
}>()

const isCopied = shallowRef(false)
const svgId = computed(() => {
    if (isCopied.value) {
        return 'check-lg'
    }
    return 'copy'
})

onMounted(() => {
    const instance = getCurrentInstance()
    const $el = instance!.vnode.el as HTMLElement
    const clipboard = new ClipboardJS($el.firstElementChild!, {
        target() {
            return $el.lastElementChild!
        }
    })
    clipboard.on('success', (e) => {
        e.clearSelection()
        isCopied.value = true
        setTimeout(() => {
            isCopied.value = false
        }, 2000)
    })
})
</script>

<style lang="stylus">
.mde-code
    > pre
        > div
            padding 1.5rem
            overflow auto
    .btn-clipboard
        display none
        top .75em
        right .5em
        padding .5em .75em .625em
        line-height 1
        color var(--bs-body-color)
        background-color var(--bs-tertiary-bg)
        border 0
        border-radius .25rem
    .lang
        top 0.5em
        right 0.8em
    &:hover
    &.is-copied
        .btn-clipboard
            display flex
        .lang
            display none
    
    &.is-copied
        button
            color var(--bs-success-text-emphasis)
</style>