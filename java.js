
////////////////////////init//////////////////////


var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 120, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.physicallyCorrectLights = true;
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ReinhardToneMapping;

document.body.appendChild( renderer.domElement );
camera.position.z = 5; //sem isto orbitcontrol falha
controls = new THREE.OrbitControls( camera );


////////////////////////texturas//////////////////////
var wallMaterial = new THREE.MeshPhongMaterial( {
  side: THREE.DoubleSide,
  bumpScale: 0.0005,
  flatShading: true,
   shininess: 0 ,
   map: wallLoader
} );

var floorMat = new THREE.MeshPhongMaterial( {
  side: THREE.DoubleSide,
	color: 0xffffff,
  bumpScale: 0.0005,
  flatShading: true,
   shininess: 0  
} );
var r = "/home/jony/CG/animation/three.js/examples/textures/cube/MilkyWay/";
var urls = [ r + "dark-s_px.jpg", r + "dark-s_nx.jpg",
			 r + "dark-s_py.jpg", r + "dark-s_ny.jpg",
			 r + "dark-s_pz.jpg", r + "dark-s_nz.jpg" ];
textureCube = new THREE.CubeTextureLoader().load( urls );
textureCube.format = THREE.RGBFormat;
textureCube.mapping = THREE.CubeReflectionMapping;

var floorLoader = new THREE.TextureLoader();
var floorRGB = floorLoader.load("/home/jony/CG/animation/three.js/examples/textures/hardwood2_diffuse.jpg", function( map ) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 4;
  map.repeat.set( 10, 24 );
  floorMat.map = map;
  floorMat.needsUpdate = true;
} );
var floorSpec = floorLoader.load("/home/jony/CG/animation/three.js/examples/textures/hardwood2_roughness.jpg", function( map ) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 4;
  map.repeat.set( 10, 24 );
  floorMat.bumpMap = map;
  floorMat.needsUpdate = true;
} );
var floorNormal = floorLoader.load("/home/jony/CG/animation/three.js/examples/textures/hardwood2_bump.jpg", function( map ) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 4;
  map.repeat.set( 10, 24 );
  floorMat.roughnessMap = map;
  floorMat.needsUpdate = true;
});


var wallLoader = new THREE.TextureLoader();
var wallrRGB = wallLoader.load("/home/jony/CG/animation/three.js/examples/textures/brick_roughness.jpg", function( map ) {
 
  map.anisotropy = 4;
  map.repeat.set( 10, 24 );
  wallMaterial.map = map;
  wallMaterial.needsUpdate = true;
} );
var wallSpec = wallLoader.load("/home/jony/CG/animation/three.js/examples/textures/hardwood2_roughness.jpg", function( map ) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 4;
  map.repeat.set( 10, 24 );
  wallMaterial.bumpMap = map;
  wallMaterial.needsUpdate = true;
} );
var wallNormal = wallLoader.load("/home/jony/CG/animation/three.js/examples/textures/brick_bump.jpg", function( map ) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 4;
  map.repeat.set( 10, 24 );
  wallMaterial.roughnessMap = map;
  wallMaterial.needsUpdate = true;
});
////////////////////////luz//////////////////////
var c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80; //cores
var light1 = createPointLight(c1 , 1);
var light2 = createPointLight(c2 , 1);
var light3 = createPointLight(c3 , 1);


scene.add(light1,light2,light3); //OLHA AS LUZES!!!!

var spotLight1 = createSpotlight( 0xFF7F00 );
var spotLight2 = createSpotlight( 0x00FF7F );

spotLight1.position.set( 2, 4, 3 );
spotLight2.position.set( 0, 5, -5 );

scene.add( spotLight1, spotLight2);



var ambLight = new THREE.AmbientLight();
scene.add(ambLight);

////////////////////////helpers//////////////////////

var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );


////////////////////////space cube//////////////////////
var cubeShader = THREE.ShaderLib[ "cube" ];
var cubeMaterial = new THREE.ShaderMaterial( {
	fragmentShader: cubeShader.fragmentShader,
	vertexShader: cubeShader.vertexShader,
	uniforms: cubeShader.uniforms,
	depthWrite: false,
	side: THREE.BackSide
} );
cubeMaterial.uniforms[ "tCube" ].value = textureCube;

var geometry = new THREE.BoxGeometry( 100, 100, 100 );
var cube = new THREE.Mesh( geometry, cubeMaterial );
scene.add( cube );

////////////////////////tower//////////////////////
var wallLoader = new THREE.TextureLoader().load("/home/jony/CG/animation/whall.jpg");

var wallg = new THREE.BoxGeometry( 2.5, 5 , 0.5); //parede de  esquerda direita




var wallR = new THREE.Mesh(wallg , wallMaterial); //direita
wallR.receiveShadow = true;
wallR.castShadow = true;
wallR.rotation.y = Math.PI / 2;
wallR.position.set(1.25 , 2.5 , 0)
scene.add(wallR);

var wallL = new THREE.Mesh(wallg , wallMaterial); //esquerda
wallL.receiveShadow = true;
wallL.castShadow = true;
wallL.rotation.y = -Math.PI / 2;
wallL.position.set(-1.25 , 2.5 , 0)
scene.add(wallL);

//paineis da frente
var wallg1 = new THREE.BoxGeometry( 2.5, 3 , 0.5 );//baixo
var wallg2 = new THREE.BoxGeometry( 2.5, 1 , 0.5 );//topo

var wall1 = new THREE.Mesh(wallg1 , wallMaterial);
var wall2 = new THREE.Mesh(wallg2 , wallMaterial);
wall1.receiveShadow = true;
wall2.receiveShadow = true;
wall1.castShadow = true;
wall2.castShadow = true;

wall1.position.set(    0, 1.5, 1,25);
wall2.position.set(    0, 4.5, 1,25);

scene.add(wall1);
scene.add(wall2);

//painel fundo
var wallB1 = new THREE.Mesh(wallg2 , wallMaterial); //back
var wallB2 = new THREE.Mesh(wallg1 , wallMaterial); //back
wallB1.receiveShadow = true;
wallB1.castShadow = true;
wallB1.position.set( 0, 0.5, -1,25);
wallB2.receiveShadow = true;
wallB2.castShadow = true;
wallB2.position.set(   0, 3.5, -1,25);

scene.add(wallB1);
scene.add(wallB2);

//telhado

var roofg = new THREE.BoxGeometry(2.5, 2.5, 0.5);
var roof = new THREE.Mesh(roofg , wallMaterial);
roof.rotation.x = Math.PI / 2;
roof.position.y = 5;
roof.receiveShadow = true;
roof.castShadow = true;

scene.add(roof);


////////////////////////chão//////////////////////
var planeGeometry = new THREE.PlaneBufferGeometry( 40, 40 );

var plane = new THREE.Mesh( planeGeometry, floorMat );
plane.receiveShadow = true;
plane.position.set(0,0,0);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

////////////////////////sonoro//////////////////////
var listener = new THREE.AudioListener();
camera.add( listener );
var audioLoader = new THREE.AudioLoader();
var audio = new THREE.Audio( listener );
audioLoader.load( '/home/jony/CG/animation/three.js/examples/sounds/376737_Skullbeatz___Bad_Cat_Maste.mp3', function ( buffer ) {
  audio.setBuffer( buffer );
  audio.setLoop( true );
  audio.play();
} );

var analizer = new THREE.AudioAnalyser( audio, 32 );




render();
animate(); 



////////////////////////funçoes extra//////////////////////

function animate() {
  tween( spotLight1 );
  tween( spotLight2 );
  
  setTimeout( animate, 5000 );
}

function render() {
  requestAnimationFrame( render );
  controls.update();
  var time = Date.now()* 0.0006;
  light1.power =analizer.getAverageFrequency()/2 ;
  light1.position.y = Math.cos( time )*3 + 2;
  light2.position.y = Math.cos(time/3)*3 + 2;
  light3.position.y = Math.cos( time )*3 + 2;
 // plane.emissive.b = analizer.getAverageFrequency() / 256;
  TWEEN.update();
 
  renderer.render( scene, camera );
}

function createSpotlight( color ) {
  var newObj = new THREE.SpotLight( color, 2 );
  newObj.castShadow = true;
  newObj.angle = 3;
  newObj.penumbra = 0.8;
  newObj.decay = 0.1;
  newObj.distance = 100;
  newObj.shadow.mapSize.width = 512;
  newObj.shadow.mapSize.height = 512;
  return newObj;
}

function tween( light ) {
  new TWEEN.Tween( light ).to( {
    angle: ( Math.random() * 0.7 ) + 0.1,
    penumbra: Math.random() + 1
  }, Math.random() * 3000 + 2000 )
  .easing( TWEEN.Easing.Quadratic.Out ).start();
  new TWEEN.Tween( light.position ).to( {
    x: ( Math.random() * 10 ) - 15,
    y: ( Math.random() * 15 ) + 15,
    z: ( Math.random() * 20 ) - 15
  }, Math.random() * 3000 + 2000 )
  .easing( TWEEN.Easing.Quadratic.Out ).start();
}

function createPointLight( color , pos){
var bulbGeometry = new THREE.SphereBufferGeometry( 0.02, 16, 8 );
bulbMat = new THREE.MeshStandardMaterial( {
  emissive: 0xffffee,
  emissiveIntensity: 1,
  color: 0x000000 //futuro trasnparente
});
var light = new THREE.PointLight(color, 2.5 ,100 , 0); //cor,intensidade,distancia,decay
light.add(new THREE.Mesh( bulbGeometry, bulbMat ) );
light.position.set(0 ,pos ,0);
light.castShadow = true;
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 1;
light.shadow.camera.far = 20;
return light;
}
