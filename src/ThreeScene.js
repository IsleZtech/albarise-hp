import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { Cache } from 'three'; // Bổ sung

const ThreeScene = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);

    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(environment).texture;
    pmremGenerator.dispose();
    scene.background = null;

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    scene.add(hemiLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 5, 5).normalize();
    scene.add(dirLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const mixers = [];
    const clock = new THREE.Clock();

    Cache.enabled = true;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    const options = [
      {
        path: '/models/ロゴ3.glb',
        position: { x: 0, y: -10, z: 0 },
        scale: { x: 70, y: 70, z: 70 },
        timeScale: 2.0,
        cameraZoom: 5,
        renderOrder: 1,
        isLooping: true,
      },
      {
        path: '/models/クマ3.glb',
        position: { x: 12, y: -16, z: 0 },
        scale: { x: 50, y: 50, z: 50 },
        timeScale: 2.0,
        cameraZoom: 5,
        renderOrder: 2,
        isLooping: false,
      },
      {
        path: '/models/パソコン2.glb',
        position: { x: 1, y: -13, z: 0 },
        scale: { x: 12, y: 12, z: 12 },
        timeScale: 2.0,
        cameraZoom: 5,
        renderOrder: 3,
        isLooping: false,
      },
      {
        path: '/models/卵3.glb',
        position: { x: -15, y: -12, z: 0 },
        scale: { x: 0.8, y: 0.8, z: 0.8 },
        timeScale: 14.0,
        cameraZoom: 3,
        renderOrder: 4,
        isLooping: false,
      },
    ];

    let loadedCount = 0;

    options.forEach((option) => {
      loader.load(
        option.path,
        (gltf) => {
          const model = gltf.scene;
          model.position.set(
            option.position.x,
            option.position.y,
            option.position.z
          );
          model.scale.set(option.scale.x, option.scale.y, option.scale.z);
          model.traverse((child) => {
            if (child.isMesh) {
              child.renderOrder = option.renderOrder || 0;
              child.material.depthTest = option.depthTest !== false;
            }
          });
          camera.position.z = Math.max(
            camera.position.z,
            option.cameraZoom || 20
          );

          scene.add(model);

          if (gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            gltf.animations.forEach((clip) => {
              const action = mixer.clipAction(clip);
              action.play();
              action.loop = option.isLooping
                ? THREE.LoopRepeat
                : THREE.LoopOnce;
              action.clampWhenFinished = !option.isLooping;
              action.timeScale = option.timeScale || 1.0;
            });
            mixers.push(mixer);
          }

          loadedCount++;
          if (loadedCount === options.length) {
            setIsLoading(false);
            render(); // render lần đầu khi load xong
          }
        },
        undefined,
        (error) => {
          console.error(`Error loading ${option.path}:`, error);
        }
      );
    });

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      let needsRender = false;

      mixers.forEach((mixer) => {
        mixer.update(delta);
        needsRender = true;
      });

      if (controls.enabled) {
        controls.update();
        needsRender = true;
      }

      if (needsRender) {
        renderer.render(scene, camera);
      }
    };
    animate();

    controls.addEventListener('change', () => {
      renderer.render(scene, camera);
    });

    const render = () => {
      renderer.render(scene, camera);
    };

    return () => {
      renderer.dispose();
      renderer.domElement.remove();
      controls.dispose();

      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (object.material.isMaterial) {
            object.material.dispose();
          } else {
            object.material.forEach((mat) => mat.dispose());
          }
        }
      });
    };
  }, []);

  return (
    <div>
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,1)',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            fontSize: '24px',
          }}
        >
          Loading...
        </div>
      )}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default ThreeScene;
