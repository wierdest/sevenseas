  import { Component, ElementRef } from '@angular/core';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

  @Component({
    selector: 'app-three-d',
    standalone: true,
    imports: [],
    templateUrl: './three-d.component.html',
    styleUrl: './three-d.component.css'
  })
  export class ThreeDComponent {
    private scene: THREE.Scene = new THREE.Scene();
    private camera: THREE.PerspectiveCamera;
    private renderer = new THREE.WebGLRenderer();

    private waterSceneModel: THREE.Object3D<THREE.Object3DEventMap> | null = null; // Property to store the loaded GLTF model
    private waterSceneAnimations: THREE.AnimationClip[] | undefined;
    private waterSceneMixer: THREE.AnimationMixer | null = null;


    private sunAndCloudModel: THREE.Object3D<THREE.Object3DEventMap> | null = null;
    private sunAndCloudAnimations: THREE.AnimationClip[] | undefined;
    private sundAndCloudMixer: THREE.AnimationMixer | null = null;


    private controls: OrbitControls;

    constructor(private el: ElementRef) {
      this.camera = new THREE.PerspectiveCamera(15, 1, 0.1, 1000);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    ngAfterViewInit() {
      // Get the container div
      const container = this.el.nativeElement.querySelector('div');

      // Append the renderer's domElement directly to the container
      container.appendChild(this.renderer.domElement);

      // Set the size of the renderer to match the container's size
      this.renderer.setSize(container.clientWidth, container.clientHeight);
        
      this.el.nativeElement.querySelector('div').appendChild(this.renderer.domElement);

          // Set the camera's aspect ratio based on the container's size
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();

      // Add lights to your scene
      const ambientLight = new THREE.AmbientLight(0xFFFFFF, 3); // Bright yellow color
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 12); // Directional light
      directionalLight.position.set(0, 2, 0);
      this.scene.add(directionalLight);

      const waterSceneLoader = new GLTFLoader();

      waterSceneLoader.load('/assets/models/water-scene/scene.gltf', (gltf) => {
        // Store the loaded GLTF model in a property
        this.waterSceneModel = gltf.scene;

        this.waterSceneAnimations = gltf.animations;

        this.waterSceneMixer = new THREE.AnimationMixer(this.waterSceneModel);

        if (this.waterSceneAnimations && this.waterSceneAnimations.length > 0) {
          const action = this.waterSceneMixer.clipAction(this.waterSceneAnimations[0]);
          action.play();
        }
        const scaleFactors = new THREE.Vector3(0.2, 0.2, 0.2); // Adjust these values as needed
        // Apply the scale to the model
        this.waterSceneModel.scale.copy(scaleFactors);

        // Set initial position and rotation
        this.waterSceneModel.position.set(0, .2, 0);
        this.waterSceneModel.rotation.set(0.4, 0, 0); // Facing a little to the right (left of the viewer)    // Add the GLTF model to the scene
        this.scene.add(this.waterSceneModel);
        }, undefined, (error: any) => {
          console.error(error);
      });

      // const sundAndCloudLoader = new GLTFLoader();

      // sundAndCloudLoader.load('/assets/models/sun-and-cloud/scene.gltf', (gltf) => {
      //   this.sunAndCloudModel = gltf.scene;

      //   this.sunAndCloudAnimations = gltf.animations;
      //   this.sundAndCloudMixer = new THREE.AnimationMixer(this.sunAndCloudModel);
      //   if(this.sunAndCloudAnimations && this.sunAndCloudAnimations.length > 0) {
      //     const action = this.sundAndCloudMixer.clipAction(this.sunAndCloudAnimations[0]);
      //     action.play()
      //   }

      //   const scaleFactors = new THREE.Vector3(0.0002, 0.0002, 0.0002); // Adjust these values as needed
      //   this.sunAndCloudModel.scale.copy(scaleFactors);
      //   this.sunAndCloudModel.position.set(0, .5, 0); // Adjust these values as needed
      //   this.sunAndCloudModel.rotation.set(0, 0, 0);

      //   this.scene.add(this.sunAndCloudModel);

      // })

      this.renderer.setClearColor(new THREE.Color(0xE1F5FE), 0);  
      
      // this.scene.add(this.cube);

      this.camera.position.z = 5;

      this.animate();

      // Set up OrbitControls
      this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      this.controls.dampingFactor = 0.25; // higher means lower damping
      this.controls.screenSpacePanning = false;
      this.controls.maxPolarAngle = Math.PI / 2;

      }
    
    private animate() {
      requestAnimationFrame(() => this.animate());
      // Add your animation logic here

      if (this.waterSceneMixer) {
        this.waterSceneMixer.update(0.01);
      }

      // if (this.sundAndCloudMixer) {
      //   this.sundAndCloudMixer.update(0.001);
      // }

      if (this.waterSceneModel) {

        this.waterSceneModel.rotation.y -= 0.001;
        
      }

      // if (this.sunAndCloudModel) {

      //   this.sunAndCloudModel.rotation.y += 0.002
       
      // }

      this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

      this.renderer.render(this.scene, this.camera);
    }
  }
