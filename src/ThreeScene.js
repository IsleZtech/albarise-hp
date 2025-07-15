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
        scale: { x: 3, y: 3, z: 2 },
        timeScale: 1,
        cameraZoom: 1,
        isLooping: false,
      },
      {
        path: '/models/パソコン3.glb',
        position: { x: 4, y: -11, z: 2 }, // Target position when hitting ground
        startPosition: { x: 4, y: 15, z: 2 }, // Start position for falling (unified)
        scale: { x: 3, y: 3, z: 4 },
        timeScale: 1,
        cameraZoom: 1,
        isLooping: false,
      },
      {
        path: '/models/玉子7.glb',
        position: { x: -10, y: -11, z: 1 }, // Target position when hitting ground
        startPosition: { x: -10, y: 15, z: 1 }, // Start position for falling (unified)
        scale: { x: 2.5, y: 2.5, z: 2 },
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
              phase: 'falling', // falling, deform, bounce, idle
              startTime: 0,
              phaseStartTime: 0,
              velocity: 0,
              // Phase durations (as requested)
              phases: {
                falling: 2.25, // 45% of 5 seconds
                deform: 0.25,  // 5% of 5 seconds
                bounce: 1.5,   // 30% of 5 seconds
                idle: 1.0      // 20% of 5 seconds
              }
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
              action.timeScale = option.timeScale || 1.0;
            });
            mixers.push(mixer);
          }

          loadedCount++;
          if (loadedCount === options.length) {
            setIsLoading(false);
            // Start animation for all objects simultaneously
            const currentTime = Date.now();
            fallingObjects.forEach(obj => {
              obj.startTime = currentTime;
              obj.phaseStartTime = currentTime;
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

      // Update falling effects for objects
      const currentTime = Date.now();
      fallingObjects.forEach((obj) => {
        if (obj.startTime === 0) return; // Not started yet

        const totalElapsed = (currentTime - obj.startTime) / 1000; // Total time since start
        const phaseElapsed = (currentTime - obj.phaseStartTime) / 1000; // Time in current phase

        switch (obj.phase) {
          case 'falling':
            // Phase 1: Falling down (2.25 seconds)
            if (phaseElapsed < obj.phases.falling) {
              // Calculate position with gravity acceleration
              const progress = phaseElapsed / obj.phases.falling;
              const easeProgress = progress * progress; // Natural acceleration
              obj.currentY = obj.startY + (obj.targetY - obj.startY) * easeProgress;
              obj.model.position.y = obj.currentY;
              needsRender = true;
            } else {
              // Switch to deform phase
              obj.model.position.y = obj.targetY;
              obj.phase = 'deform';
              obj.phaseStartTime = currentTime;
              obj.velocity = Math.abs(obj.targetY - obj.startY) * 0.6; // 60% of falling velocity
            }
            break;

          case 'deform':
            // Phase 2: Deformation on ground impact (0.25 seconds)
            if (phaseElapsed < obj.phases.deform) {
              // Keep position, can add deformation effect if needed
              obj.model.position.y = obj.targetY;
              needsRender = true;
            } else {
              // Switch to bounce phase
              // obj.phase = 'bounce';
              obj.phaseStartTime = currentTime;
            }
            break;

          case 'bounce':
            // Phase 3: Bounce up and decelerate (1.5 seconds)
            if (phaseElapsed < obj.phases.bounce) {
              const progress = phaseElapsed / obj.phases.bounce;

              // Create smooth bounce effect with natural easing
              const bounceHeight = obj.velocity * 0.08; // Reduce bounce height to 8%

              // Use sine wave with easing for smoother motion
              const easeInOut = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

              // Create natural bounce curve
              const bounceY = obj.targetY + bounceHeight * Math.sin(Math.PI * easeInOut) * (1 - progress * 0.5);

              obj.model.position.y = bounceY;
              needsRender = true;
            } else {
              // Switch to idle phase
              obj.phase = 'idle';
              obj.phaseStartTime = currentTime;
              obj.model.position.y = obj.targetY;
            }
            break;

          case 'idle':
            // Phase 4: Stop with light effects (1.0 seconds)
            if (phaseElapsed < obj.phases.idle) {
              // Can add light wobble or other effects
              const wobble = Math.sin(phaseElapsed * 8) * 0.05 * (1 - phaseElapsed / obj.phases.idle);
              obj.model.position.y = obj.targetY + wobble;
              needsRender = true;
            } else {
              // End animation
              obj.model.position.y = obj.targetY;
              obj.phase = 'finished';
            }
            break;
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
