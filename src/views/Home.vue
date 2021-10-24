<template>
  <div class="home">
    <div class="container"
         ref="container"></div>
    <div class="frequency">频率 <span>{{frequency}}</span> </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

var scene, mesh;
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      camera: null,
      renderer: null,
      controls: null,
      frequency: 0,
      T0: 0
    }
  },
  mounted () {
    this.init()
    this.animate()
  },
  methods: {
    init () {
      // 创建场景对象 scene
      scene = new THREE.Scene()
      let container = this.$refs.container

      // 相机
      this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 2000)
      this.camera.position.z = 50
      this.camera.position.y = 50;

      // 光源
      const light = new THREE.DirectionalLight(0xffffff);
      light.position.set(0.5, 1.0, 0.5).normalize();
      scene.add(light);

      // Grid辅助线
      const grid = new THREE.GridHelper(50, 50, 0xffffff, 0x555555);
      scene.add(grid);

      // 创建网格模型 mesh
      // 正方体BoxGeometry 
      let geometry = new THREE.BoxGeometry(1, 1, 1)
      // 材质对象 material
      let material = new THREE.MeshNormalMaterial()
      mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(0.5, 0.5, 0.5)
      scene.add(mesh)
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      this.renderer.setClearColor(0x999999, 1)
      container.appendChild(this.renderer.domElement)

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    animate () {
      let T1 = new Date()
      let t = T1 - this.T0
      // console.log("频率",Math.ceil(1000/t))
      this.frequency = Math.ceil(1000 / t)
      this.T0 = T1

      requestAnimationFrame(this.animate)
      // mesh.rotation.x += 0.01
      // mesh.rotation.y += 0.02
      //  mesh.rotateY(0.01);
      this.controls.update();
      this.renderer.render(scene, this.camera)
    }
  },
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
}
.container {
  width: 100%;
  height: 100%;
}
canvas {
  width: 100%;
  height: 100%;
}
.frequency {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  font-size: 16px;
}
</style>
