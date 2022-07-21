import { Ref } from 'vue'

const clientWidth: Ref<number> = ref(0)
const clientHeight: Ref<number> = ref(0)
const targetDom: Ref<HTMLElement | null> = ref(null)

export const useWindowSize = () => {
  onMounted(() => {
    targetDom.value = document.getElementById('app')
    clientWidth.value = targetDom.value.clientWidth
    clientHeight.value = targetDom.value.clientHeight
    window.addEventListener('resize', updateWindowSize)
  })
  const updateWindowSize = () => {
    clientWidth.value = targetDom.value.clientWidth
    clientHeight.value = targetDom.value.clientHeight
  }
  return {
    clientWidth,
    clientHeight
  }
}