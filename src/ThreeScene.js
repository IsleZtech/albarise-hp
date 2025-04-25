import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = () => {
  useEffect(() => {
    const scene = new THREE.Scene(); // Initialize the scene
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Set up camera
    camera.position.z = 120; // Default camera position

    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Create a transparent renderer
    renderer.setSize(window.innerWidth, window.innerHeight); // Set renderer size
    document.body.appendChild(renderer.domElement); // Append renderer to the DOM

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft ambient light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Strong directional light
    directionalLight.position.set(4, 4, 4).normalize(); // Light position
    scene.add(directionalLight);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable smooth damping
    controls.dampingFactor = 0.01; // Damping speed
    controls.screenSpacePanning = false; // Disable screen space panning

    // 3D Models
    const options = [
      {
        path: '/models/ロゴ.glb',
        position: { x: -2, y: -1, z: 1 },
        scale: { x: 25, y: 25, z: 25 },
        timeScale: 1.0,
        cameraZoom: 15, // Custom camera zoom for ロゴ.glb
      },
      {
        path: '/models/玉子.glb',
        position: { x: -10, y: -10, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        timeScale: 4.0,
        cameraZoom: 20,
      },
      {
        path: '/models/パソコン.glb',
        position: { x: 10, y: -10, z: 0 },
        scale: { x: 10, y: 10, z: 10 },
        timeScale: 1.0,
        cameraZoom: 20,
      },
    ];
    const startTime = Date.now(); // Start timing

    const mixers = []; // Store AnimationMixers
    const clock = new THREE.Clock(); // Timer for animation updates

    // Names of the model parts to be hidden
    const namesToHide = [
      '球下二重', '球上二重', '平面', '白身', '立方体', '平面001',
    ];

    const gltfLoader = new GLTFLoader();
    options.forEach((option) => {
      gltfLoader.load(option.path, (gltf) => {
        const model = gltf.scene;

        // Traverse all child objects and hide specific parts
        model.traverse((child) => {
          if (namesToHide.includes(child.name.trim())) {
            child.visible = false;
          }
        });

        // Set model position and scale
        model.position.set(option.position.x, option.position.y, option.position.z);
        model.scale.set(option.scale.x, option.scale.y, option.scale.z);

        // Apply custom camera zoom per model
        camera.position.z = option.cameraZoom;
        const endTime = Date.now();
        const loadTime = (endTime - startTime) / 1000;
        console.log(`.glb model loaded in ${loadTime} seconds`);
        scene.add(model);

        // Play animation if available
        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
            action.timeScale = option.timeScale;
          });
          mixers.push(mixer);
        }
      });
    });

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixers.forEach((mixer) => mixer.update(delta));
      controls.update(); // Update controls
      renderer.render(scene, camera);
    };

    animate(); // Start animation loop

    return () => {
      renderer.dispose(); // Clean up renderer
      renderer.domElement.remove(); // Remove renderer DOM element
    };
  }, []);

  return null;
};

export default ThreeScene;
