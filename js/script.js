const filename = "scene_mesh_textured";
const filepath = "./assets/Archive5/";
const clock = new THREE.Clock();
var scene;
const BACKGROUND_COLOR = 0x888888;
var camera;
var renderer;
var cameraControls ;
var wheelScroll = 0;
var mainObj = null;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var latlng = latTest2;// testLat;// latTest2 // latlngDataJson
var finalLatLngArray = [];
var xTotal = 0;
var zTotal = 0;
var altReducerFactor = 2;
var angleReducerFactor = 90;
var buondingBox;
var countI = 0;
var lastClickedDrone = null;
var lastClickedDroneMaterial = null;
var MAP_WIDTH = 22300;
var MAP_HEIGHT = 14800;

function init()
{
  scene = new THREE.Scene();
  scene.background = new THREE.Color(BACKGROUND_COLOR );
  CameraControls.install( { THREE: THREE } );
  
  camera = new THREE.PerspectiveCamera( 54, window.innerWidth/window.innerHeight, 0.1, 1000 );
  //camera.position.set( 0, 90, 0 );
  camera.position.set( -87, 30, 0 );
  
  var myCanvas = document.getElementById("view3d");
  console.log(myCanvas.style.width);
  
  
  renderer = new THREE.WebGLRenderer({antialias: true, canvas: myCanvas});
  renderer.setPixelRatio( window.devicePixelRatio );
  //console.log($(myCanvas).css("width"));
  //renderer.setSize( $(myCanvas).css("width").replace("px", ""), $(myCanvas).css("height").replace("px", "") );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  
  cameraControls = new CameraControls( camera, renderer.domElement );
  cameraControls.dollyToCursor = true;
  cameraControls.maxPolarAngle = 1.24;
  
  var ambientLight = new THREE.AmbientLight( 0xcccccc, 1.5 );
  scene.add( ambientLight );
  //document.addEventListener("click", onMouseOrTouch, false);
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
};

function loadObject()
{
	/* var loader = new THREE.FBXLoader();
	 loader.load( './BedRoom/Models/CUSHION B 16X16 IN/CUSHION B 16X16 IN.FBX', function ( object ) {

	   console.log("------------111111111------------");
	   scene.add( object );
	   console.log("------------22222222222222------------");

	 } , undefined, function ( e ) {

	  console.error( e );

	}); */
	 
	 
	  var objLoader = new THREE.OBJLoader();
      objLoader.setPath('./assets/');
      objLoader.load('cushion'+'.obj', function (object) {
        object.name = "MainObj";
        //object.rotation.x = toRadians(-90);
        object.position.set(0,-30,0);
        //buondingBox = new THREE.Box3().setFromObject( object );
        //mainObj = object;
        scene.add(object);
      });
	 
}

var animate = function animate() {
  const delta = clock.getDelta();
  const hasControlsUpdated = cameraControls.update( delta );
    //console.log(camera.position);
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
};

function start()
{
  init();
  loadObject();
  animate();
}

