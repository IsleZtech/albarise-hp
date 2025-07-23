import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { Cache } from 'three'; // Additional import

const ThreeScene = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    // Add threescene class to body when component mounts
    document.body.classList.add('threescene');

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
        path: '/models/クマ4.glb',
        position: { x: 10, y: -12, z: 2 }, // Target position when hitting ground
        startPosition: { x: 10, y: 15, z: 2 }, // Start position for falling (unified)
        scale: { x: 3, y: 3, z: 3 },
        timeScale: 1,
        cameraZoom: 1,
        isLooping: false,
      },
      {
        path: '/models/パソコン4.glb',
        position: { x: 4, y: -11, z: 2 }, // Target position when hitting ground
        startPosition: { x: 4, y: 15, z: 2 }, // Start position for falling (unified)
        scale: { x: 3, y: 3, z: 3 },
        timeScale: 1,
        cameraZoom: 1,
        isLooping: false,
      },
      {
        path: '/models/玉子8.glb',
        position: { x: -25, y: -13, z: 10 }, // Target position when hitting ground
        startPosition: { x: -15, y: 15, z: 5 }, // Start position for falling (unified)
        scale: { x: 2, y: 2, z: 1 },
        timeScale: 1,
        cameraZoom: 1,
        isLooping: false,
      },
      {
        path: '/models/ロゴ4.glb',
        position: { x: 0, y: 0, z: -2 }, // Logo doesn't fall, fixed position
        scale: { x: 4, y: 4, z: 4 },
        timeScale: 1,
        cameraZoom: 1,
        isLooping: true,
      },
    ];

    let loadedCount = 0;
    const fallingObjects = []; // Array to store falling objects
    const animationStartTime = Date.now(); // Animation start time

    options.forEach((option) => {
      loader.load(
        option.path,
        (gltf) => {
          const model = gltf.scene;

          // Set initial position
          if (option.startPosition) {
            model.position.set(
              option.startPosition.x,
              option.startPosition.y,
              option.startPosition.z
            );
          } else {
            model.position.set(
              option.position.x,
              option.position.y,
              option.position.z
            );
          }

          model.scale.set(option.scale.x, option.scale.y, option.scale.z);
          camera.position.z = Math.max(
            camera.position.z,
            option.cameraZoom || 20
          );

          scene.add(model);

          // Add to falling objects array if has startPosition
          if (option.startPosition && option.path !== '/models/ロゴ4.glb') {
            fallingObjects.push({
              model: model,
              startY: option.startPosition.y,
              targetY: option.position.y,
              currentY: option.startPosition.y,
              startTime: 0,
              fallingDuration: 1.0 // Reduced to 1.0 second for faster falling to match animation speed
            });
          }

          if (gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            gltf.animations.forEach((clip) => {
              const action = mixer.clipAction(clip);
              action.play();
              action.loop = option.isLooping
                ? THREE.LoopRepeat
                : THREE.LoopOnce;
              action.clampWhenFinished = !option.isLooping;
              // Increase animation speed for faster playback when hitting ground
              action.timeScale = option.isLooping ? (option.timeScale || 1.0) : 2.5; // 2.5x faster for non-looping animations
            });
            mixers.push(mixer);
          }

          loadedCount++;
          if (loadedCount === options.length) {
            setIsLoading(false);
            // Start simple falling animation for all objects simultaneously
            const currentTime = Date.now();
            fallingObjects.forEach(obj => {
              obj.startTime = currentTime;
            });
            render();
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

      // Update animation mixers
      mixers.forEach((mixer) => {
        mixer.update(delta);
        needsRender = true;
      });

      // Update simple falling effects for objects
      const currentTime = Date.now();
      fallingObjects.forEach((obj) => {
        if (obj.startTime === 0) return; // Not started yet

        const elapsed = (currentTime - obj.startTime) / 1000; // Time since start in seconds

        if (elapsed < obj.fallingDuration) {
          // Still falling - simple gravity effect
          const progress = elapsed / obj.fallingDuration;
          const easeProgress = progress * progress; // Natural acceleration due to gravity
          obj.currentY = obj.startY + (obj.targetY - obj.startY) * easeProgress;
          obj.model.position.y = obj.currentY;
          needsRender = true;
        } else {
          // Finished falling - stay at target position
          obj.model.position.y = obj.targetY;
        }
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
      // Remove threescene class from body when component unmounts
      document.body.classList.remove('threescene');

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
