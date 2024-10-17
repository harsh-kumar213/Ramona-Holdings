
import earthMap from '../assets/texture/earthmap1k.jpg';
import earthBump from '../assets/texture/earthbump.jpg';
import earthCloud from '../assets/texture/earthCloud.png';
import galaxy from '../assets/texture/galaxy.png';

let scene;
let camera;
let renderer;

function  main() {
    const canvas = document.querySelector('#c');
    
    // Initialize Scene
    scene = new THREE.Scene();

    // Initialize Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    scene.add(camera);

    // Initialize Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);

    // Create Earth Geometry
    const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32); // Original Earth size (0.6)
    
    const textureLoader = new THREE.TextureLoader();

    const earthMaterial = new THREE.MeshPhongMaterial({
        roughness: 1,
        metalness: 0,
        map: textureLoader.load(earthMap),
        bumpMap: textureLoader.load(earthBump),
        bumpScale: 0.3,
    });

    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);

    // Scale the Earth to 20% smaller
    earthMesh.scale.set(0.8, 0.8, 0.8); // 20% smaller
    scene.add(earthMesh);

    // Set Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Set Point Light
    const pointLight = new THREE.PointLight(0xffffff, 0.9);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Create Cloud Geometry (relative size to Earth)
    const cloudGeometry = new THREE.SphereGeometry(0.63 * 0.8, 32, 32); // Adjusted to be relative to Earth size

    const cloudMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load(earthCloud),
        transparent: true,
    });

    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(cloudMesh);

    // Create Star Background (you can scale it down if needed, here it's left as-is)
    const starGeometry = new THREE.SphereGeometry(80, 64, 64);

    const starMaterial = new THREE.MeshBasicMaterial({
        map: textureLoader.load(galaxy),
        side: THREE.BackSide,
    });

    const starMesh = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(starMesh);

    // Animation function
    const animate = () => {
        requestAnimationFrame(animate);
        earthMesh.rotation.y -= 0.0015;
        cloudMesh.rotation.y += 0.0015;
        starMesh.rotation.y += 0.0005;

        render();
    };

    // Render function
    const render = () => {
        renderer.render(scene, camera);
    };

    // Call the animate function
    animate();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    // Update camera aspect ratio and projection matrix
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Execute main function on window load
window.onload = function(){
    setTimeout(main,1000);
};
