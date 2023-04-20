var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();

// Variables para la Grilla y Flechas

var size = 20;
var arrowSize = 5;
var divisions = 20;
var origin = new THREE.Vector3( 0, 0, 0 );
var x = new THREE.Vector3( 1, 0, 0 );
var y = new THREE.Vector3( 0, 1, 0 );
var z = new THREE.Vector3( 0, 0, 1 );
var color2 = new THREE.Color( 0x333333 ); 
var colorR = new THREE.Color( 0xAA0000 );
var colorG = new THREE.Color( 0x00AA00 );
var colorB = new THREE.Color( 0x0000AA );

//Crear la Grilla
var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

//Flechas
var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );

// Posición de la camara

var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
camera.position.x = 5;
camera.position.y = 2;
camera.position.z = 3;
scene.add(camera);
const light = new THREE.AmbientLight(0x404040, 5);
scene.add(light);

// Se añaden los elementos a la escena

scene.add(gridHelperXZ);
scene.add(arrowX);
scene.add(arrowY);
scene.add(arrowZ);

//Variables de Color para el arreglo en cada cubo
const color = [{color:0x00008b}, {color:0x0000FF},{color:0x00FFFF}];

// Función Cubo donde base, altura y ancho son equivalentes al lado del cubo
function cubo(base, altura, ancho, col) {
  const geometry = new THREE.BoxGeometry(base, altura, ancho);
  // Se crea un arreglo con los materiales que se quieren utilizar
  const material = [new THREE.MeshMatcapMaterial(color[0]),new THREE.MeshPhongMaterial(color[1]),new THREE.MeshToonMaterial(color[2])];     
  return new THREE.Mesh(geometry, material[i]);
}

var Cubo = []; 
var n = color.length; // Variable de Numero de cubos en base a la cantidad de colores existentes
var lado = 1/2; //variable del lado del cubo
var t = 1/2; // Variable para trasladar los cubos
var h = 4;

// Utilizar la misma variable para la traslación hace que el for funcione de manera erronea, por eso se usan dos variables iguales
for (var i = 0; i < 2; i++) {
    Cubo[i] = cubo(t, h, t, color[i]);
    Cubo[i].position.x = t/2; 
    Cubo[i].position.y = t*4;
    Cubo[i].position.z = t/2;
    // Se divide a la mitad el valor del cubo hasta que se complete el ciclo
}

// Se añade el cubo a la escena
const group = new THREE.Group();
for (i = 0; i < n; i++) {
  scene.add(Cubo[i]);
}

const controls = new THREE.OrbitControls(camera, renderer.domElement);

function animate() {

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera)
}
animate();