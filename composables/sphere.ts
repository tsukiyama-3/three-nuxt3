import { Line, LineBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer } from 'three'

import { Ref } from 'vue'

export const useSphere = (container: Ref<HTMLElement>, clientWidth: Ref<number>, clientHeight: Ref<number>) => {
  const init = () => {
    // レンダラー作成
    const renderer = new WebGLRenderer()
    renderer.setSize(clientWidth.value, clientHeight.value)
    renderer.setPixelRatio(clientWidth.value / clientHeight.value)
    container.value.appendChild(renderer.domElement)
    // シーン追加
    const scene = new Scene()
    // カメラ作成
    const camera = new PerspectiveCamera(45, clientWidth.value / clientHeight.value)
    camera.position.set(20, 20, 20)
    camera.lookAt(new Vector3(0, 0, 0))
    // 球体作成
    const geometry = new SphereGeometry(10, 32, 32)
    const material = new LineBasicMaterial({ color: 0x6699ff, linewidth: 1 })
    const sphere = new Line(geometry, material)
    scene.add(sphere)
    // 毎フレーム時に実行されるループイベント
    const tick = () => {
      // 球体を回転
      sphere.rotation.x += .01
      sphere.rotation.y += .01
      // レンダリング
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
    onUnmounted(() => {
      renderer.dispose()
      renderer.forceContextLoss()
    })
  }
  return { init }
}