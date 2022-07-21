<script setup lang="ts">
import { Ref } from 'vue'
const container: Ref<HTMLElement | null> = ref(null)
const { clientWidth, clientHeight } = useWindowSize()
onMounted(() => {
  const { init } = useSphere(container, clientWidth, clientHeight)
  init()
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full" ref="container">
    <div class="absolute top-0 left-0">
      <NuxtLink to="box" class="block py-4 px-12 bg-white font-bold hover:underline">Box ></NuxtLink>
    </div>
  </div>
</template>