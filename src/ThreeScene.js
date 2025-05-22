import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

const ThreeScene = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    document.body.appendChild(renderer.domElement);

    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(environment).texture;
    scene.background = null;

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    scene.add(hemiLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 5, 5).normalize();
    scene.add(dirLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const mixers = [];
    const clock = new THREE.Clock();

    const options = [
      {
        path: '/models/ロゴ3.glb',
        position: { x: -4, y: -6, z: 0 },
        scale: { x: 50, y: 50, z: 50 },
        timeScale: 1.0,
        cameraZoom: 5,
        isLooping: true, 
      },
      {
        path: '/models/クマ3.glb',
        position: { x: 10, y: -12, z: 2 },
        scale: { x: 75, y: 75, z: 75 },
        timeScale: 1.0,
        cameraZoom: 5,
        isLooping: false,
      },
      {
        path: '/models/パソコン2.glb',
        position: { x: 0, y: -12, z: 2 },
        scale: { x: 10, y: 10, z: 10 },
        timeScale: 1.0,
        cameraZoom: 5,
        isLooping: false,
      },
      {
        path: '/models/卵3.glb',
        position: { x: -15, y: -12, z: 2 },
        scale: { x: 1, y: 1, z: 1 },
        timeScale: 5.0,
        cameraZoom: 5,
        isLooping: false,
      },
    ];

    const loader = new GLTFLoader();

    options.forEach((option) => {
      loader.load(option.path, (gltf) => {
        const model = gltf.scene;
        model.position.set(option.position.x, option.position.y, option.position.z);
        model.scale.set(option.scale.x, option.scale.y, option.scale.z);

        camera.position.z = Math.max(camera.position.z, option.cameraZoom || 20);

        scene.add(model);

        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
            if (option.isLooping) {
              action.loop = THREE.LoopRepeat; 
            } else {
              action.loop = THREE.LoopOnce; 
              action.clampWhenFinished = true; 
            }
            action.timeScale = option.timeScale || 1.0;
          });
          mixers.push(mixer);
        }
      });
    });

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixers.forEach((mixer) => mixer.update(delta));
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return null;
};

export default ThreeScene;
