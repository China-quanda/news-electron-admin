<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const { toggle, isFullscreen } = useFullscreen()
const btn = () => {
  toggle()
}
</script>

<template>
  <div style="cursor: pointer; margin: 0px 5px" @click="btn">
    <my-icon
      :icon="isFullscreen ? 'icon-tuichuquanping' : 'icon-quanping'"
      size="20"
      @click="btn"
    />
  </div>
</template>
