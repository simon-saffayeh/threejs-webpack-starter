import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
// Loading
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/NormalMap.png')
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry( .5,64,64);

// Materials

const material = new THREE.MeshStandardMaterial()
material.color = new THREE.Color(0x292929)
material.metalness = 0.7;
material.roughness = 0.2;
// material.wireframe = true
material.normalMap = normalTexture

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 3)
pointLight2.position.set(4.7,-10.6,1)
scene.add(pointLight2)



const pointLight3 = new THREE.PointLight(0xff0000, 3)
pointLight2.position.set(4.7,-10.6,1)
scene.add(pointLight3)
const light1_folder = gui.addFolder("Light 1")
light1_folder.add(pointLight3.position, 'x').step(0.1).min(-10).max(10)
light1_folder.add(pointLight3.position, 'y').step(0.1).min(-30).max(30)
light1_folder.add(pointLight3.position, 'z').step(0.1).min(-10).max(10)
light1_folder.add(pointLight3, 'intensity').step(0.1).min(0).max(10)


const light_color = {
    color: 0xff0
}
light1_folder.addColor(light_color, 'color')
.onChange(() => {
    pointLight3.color.set(light_color.color)
})


const pointLightHelper = new THREE.PointLightHelper(pointLight3,1)
scene.add(pointLightHelper)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

//boxes choose a box