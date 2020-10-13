$( document ).ready(function(){
  console.log("DOM listo");

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  $( "body" ).append( renderer.domElement );

  var light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 0, 0, 10 );
  scene.add( light );

  let geometry = new THREE.ConeGeometry( 5, 5, 10 );
  geometry.computeFlatVertexNormals();
  let material = new THREE.MeshLambertMaterial ( {color: 0x8bd6d4, flatShading:true } );
  let bola = new THREE.Mesh( geometry, material );
  bola.position.z = -8;

  scene.add( bola );

  let geometry_2 = new THREE.ConeGeometry( 5, 5, 10 );
  let material_2 = new THREE.MeshBasicMaterial( { color: 0xffeb87, wireframe: true } );
  let bola2 = new THREE.Mesh( geometry_2, material_2 );
  scene.add( bola2 );
  bola2.position.z = -8;


  camera.position.z = 4;

let contenedor = new THREE.Object3D();
scene.add( contenedor );
contenedor.position.z = -8;

  for( let i = 0; i < bola.geometry.vertices.length; i++ ){
    let geometry = new THREE.SphereGeometry( 0.3, 0.3, 0.3 );
    let material = new THREE.MeshLambertMaterial({ color: 0x85fffb});
    let cubo = new THREE.Mesh( geometry, material );
    cubo.position.set( bola.geometry.vertices[ i ].x, bola.geometry.vertices[ i ].y, bola.geometry.vertices[ i ].z );
    contenedor.add( cubo );
  }

  bola.scale.x = 0.9;
  bola.scale.y = 0.9;
  bola.scale.z = 0.9;

console.log( bola2 );

  let malla = new THREE.Object3D;
  scene.add( malla );

  let countX = 10;
  let countY = 10;
  let countZ = 10;

  for( let i = 0; i < countX; i++ ){
    for( let j = 0; j < countY; j++ ){
      for( let k = 0; k < countZ; k++ ){
        let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        let material = new THREE.MeshLambertMaterial({ color: 0xffffff });
        let nodo = new THREE.Mesh( geometry, material );
        nodo.position.x = -((countX/2) * 0.5 ) + ( i * 0.5 );
        nodo.position.y = -((countY/2) * 0.5 ) + ( j * 0.5 );
        nodo.position.z = -((countZ/2) * 0.5 ) + ( k * 0.5 );
        malla.add( nodo );
      }
    }
  }


function animate(){
    requestAnimationFrame( animate );

    bola.rotation.x -= 0.005;
    bola2.rotation.x -= 0.005;

    for ( let i = 0; i < bola.geometry.vertices.length; i++){
      bola.geometry.vertices[ i ].x += (-0.005 + (Math.random() * 0.01) );
      bola.geometry.vertices[ i ].y += (-0.005 + (Math.random() * 0.01) );
      bola.geometry.vertices[ i ].z += (-0.005 + (Math.random() * 0.01) );
    }
    bola.geometry.verticesNeedUpdate = true;

    for( let i = 0; i < contenedor.children.length; i++ ){
      contenedor.children[ i ]. position.x = bola.geometry.vertices[ i ].x;
      contenedor.children[ i ]. position.y = bola.geometry.vertices[ i ].y;
      contenedor.children[ i ]. position.z = bola.geometry.vertices[ i ].z;

      bola2.geometry.vertices[ i ].x = bola.geometry.vertices[ i ].x;
      bola2.geometry.vertices[ i ].y = bola.geometry.vertices[ i ].y;
      bola2.geometry.vertices[ i ].z = bola.geometry.vertices[ i ].z;
      }
    bola2.geometry.verticesNeedUpdate = true;

    contenedor.rotation.x -= 0.005;

    malla.rotation.y += 0.001;

    renderer.render( scene, camera );
  }

animate();

});
