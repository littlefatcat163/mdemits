<script setup lang="ts">
import { getCurrentInstance, onMounted, shallowRef, computed } from 'vue'
import ClipboardJS from 'clipboard'
import MDESvg from './MDESvg.vue'

const isCopied = shallowRef(false)
const svgId = computed(() => {
    if (isCopied.value) {
        return 'clipboard-check'
    }
    return 'clipboard'
})

onMounted(() => {
    const instance = getCurrentInstance()
    const { $btn, $code } = instance!.refs
    const clipboard = new ClipboardJS($btn as HTMLElement, {
        target() {
            return $code as HTMLElement
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

<template>
    <div class="mde-code position-relative" :class="{'is-copied': isCopied}">
        <button ref="$btn" type="button" class="btn-clipboard position-absolute align-items-center" title="Copy to clipboard!"><small :class="['me-2', {'d-none': !isCopied}]">Copied</small><MDESvg :id="svgId" size="1.25em" /></button>
        <small class="lang position-absolute fw-medium text-body-tertiary">javascript</small>
        <pre><span class="hljs d-block p-4"><code ref="$code"><span class="hljs-keyword">const</span> highlightedCode = hljs.<span class="hljs-title function_">highlight</span>(
  <span class="hljs-string">'&lt;span&gt;Hello World!&lt;/span&gt;'</span>,
  { <span class="hljs-attr">language</span>: <span class="hljs-string">'xml'</span> }
).<span class="hljs-property">value</span></code></span></pre>
    </div>
</template>

<style lang="stylus">
.mde-code
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
</style>