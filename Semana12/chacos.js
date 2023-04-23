var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();

// Variables para la Grilla y Flechas

var size = 1000;
var arrowSize = 1000;
var divisions = 1000;
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
camera.position.x = -2;
camera.position.y = 5;
camera.position.z = 17;
scene.add(camera);
const light = new THREE.AmbientLight(0x404040, 5);
scene.add(light);

// Se añaden los elementos a la escena

scene.add(gridHelperXZ);
scene.add(arrowX);
scene.add(arrowY);
scene.add(arrowZ);

//Variables de Color para el arreglo en cada cubo
const color = [{color:0x0000FF}, {color:0x0FFFFF}];

// Función Cubo donde base, altura y ancho son equivalentes al lado del cubo
function cubo(base, altura, ancho, col) {
  const geometry = new THREE.BoxGeometry(base, altura, ancho);
  const material = new THREE.MeshMatcapMaterial(color[i]);     
  return new THREE.Mesh(geometry, material);
}

var Cubo = []; // Arreglo Vacio para añadir los cubos mas adelante
var n = color.length; // Variable de Numero de cubos en base a la cantidad de colores existentes

// Variables
var base = 6; 
var L = base;
var altura = L/10; 

var beta = Math.PI/8;
var alfa = Math.PI/6;
var gamma = 2*Math.PI;

// for para añadir los cubos a la escena

for (var i = 0; i < n; i++) { // El arreglo corre hasta N, para que se creen los cubos en función del numero de colores
    Cubo[i] = cubo(altura, L, altura, color[i]); // Se añaden los parametros establecidos en las variables
    scene.add(Cubo[i]) // Se añaden los cubos a la escena
}

//  La función rotar permite realizar una rotación sobre el cubo en el eje deseado

function Rotar( objeto, eje, angulo) { // objeto seria el Objeto que se va a rotar, eje es el eje sobre el cual rota y el angulo, es la rotación que tendra el objeto
    
  const quaternion = new THREE.Quaternion(); 
  quaternion.setFromAxisAngle(eje, angulo);

  objeto.quaternion.multiply(quaternion); 
} 

// Función para trasladar el cubo

function TraslacionCubo( rectangulo, TX, TY, TZ) { // rectangulo es el objeto a trasladar, TX,TY,TZ son los ejes X,Y,Z en donde se va a trasladar el objeto
  rectangulo.position.set(TX, TY, TZ)
}

// Traslaciones y rotaciones
TraslacionCubo(Cubo[0], 0, L/2, 0);
TraslacionCubo(Cubo[1], 0.257*L, 1.457*L, 0);
Rotar(Cubo[1],z,-alfa)

// Se agrupan las figuras
const Cubos = new THREE.Group();
Cubos.add(Cubo[0]);
Cubos.add(Cubo[1]);
scene.add(Cubos)

// Rotación en ambos cubos para que se muevan en la misma dirección
Rotar(Cubos, z, -beta);
Cubos.rotation.y = gamma;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
function animate() {

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera)
}
animate();
