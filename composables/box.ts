import { BoxGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import { Ref } from 'vue'

export const useBox = (container: Ref<HTMLElement>, clientWidth: Ref<number>, clientHeight: Ref<number>) => {
  const init = () => { 
    // レンダラー作成
    const renderer = new WebGLRenderer()
    renderer.setSize(clientWidth.value, clientHeight.value)
    renderer.setPixelRatio(clientWidth.value / clientHeight.value)
    container.value.appendChild(renderer.domElement)
    // シーン作成
    const scene = new Scene()
    // カメラ作成
    const camera = new PerspectiveCamera(45, clientWidth.value / clientHeight.value)
    camera.position.set(20, 20, 20)
    camera.lookAt(new Vector3(0, 0, 0))
    // 箱作成
    const geometry = new BoxGeometry(10, 10, 10)
    const material = new MeshNormalMaterial()
    const box = new Mesh(geometry, material)
    scene.add(box)
    // 毎フレーム時に実行されるループイベント
    const tick = () => {
      // 箱を回転
      box.rotation.x += .01
      box.rotation.y += .01
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