import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Tween } from '@tweenjs/tween.js';  // Import Tween

const ThreeScene = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Models
    const options = [
      {
        path: '/models/玉子.glb',
        position: { x: 0, y: -10, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        timeScale: 7.0,
        cameraZoom: 40
      }
    ];

    const mixers = [];
    const clock = new THREE.Clock();

    const namesToHide = [
      '球下二重', // 2 qua phia duoi
      '球上二重',// 2 qua phia duoi
      '平面', // background
      '白身', // qua trung o phia tren bi vo
      
      // '球001', // nua qua ben phai
      // '球005' , // nua qua ben trai

      // 'テキスト', // text
      // '立方体', // long trang
      // '黄身', // long dao
    ];

    const gltfLoader = new GLTFLoader();
    options.forEach((option) => {
      gltfLoader.load(option.path, (gltf) => {
        const model = gltf.scene;

        model.traverse((child) => {
          if (child.isMesh) {
            console.log(`${child.name}`);
            if (namesToHide.includes(child.name.trim())) {
              child.visible = false;
              console.log(`Part ${child.name} hidden`);
            }
          }
        });

        model.position.set(option.position.x, option.position.y, option.position.z);
        model.scale.set(option.scale.x, option.scale.y, option.scale.z);
        camera.position.z = option.cameraZoom;

        scene.add(model);

        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
            action.timeScale = option.timeScale;
          });
          mixers.push(mixer);
        }

        // 3 parts will appear after 4 seconds
        setTimeout(() => {
          scene.traverse((child) => {
            if (child.isMesh) {
              if (child.name === 'テキスト' || child.name === '立方体' || child.name === '黄身') {
                child.visible = true;

                console.log(`Part ${child.name} is now visible`);
              }
            }
          });
        }, 4000); // Set after 4 seconds
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
