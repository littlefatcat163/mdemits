<script setup lang="ts">
import MDESvg from './MDESvg.vue'
</script>

<template>
    <div class="position-relative">
        <button type="button" class="btn-clipboard">
            <MDESvg id="clipboard" size="1em" />
        </button>
        <small class="lang position-absolute fw-medium">javascript</small>
        <pre>
            <span class="hljs d-block">
                <code><span class="hljs-keyword">const</span> highlightedCode = hljs.<span class="hljs-title function_">highlight</span>(
  <span class="hljs-string">'&lt;span&gt;Hello World!&lt;/span&gt;'</span>,
  { <span class="hljs-attr">language</span>: <span class="hljs-string">'xml'</span> }
).<span class="hljs-property">value</span></code>
            </span>
        </pre>
    </div>
</template>

<style lang="stylus">
.btn-clipboard
    position absolute
    top .75em
    right .5em
    display block
    padding .5em .75em .625em
    line-height 1
    color var(--bs-body-color)
    background-color var(--bs-tertiary-bg)
    border 0
    border-radius .25rem
.lang
    top 0
    right 0
</style>