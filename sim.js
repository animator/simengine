/**
 * Created by root on 7/11/13.
 */

// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
// custom global variables
var cube;

var tets = new Array();
var tetGeometry = new Array();

init();
animate();

// FUNCTIONS
function init()
{
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0.2,0.2,0.2);
    camera.lookAt(scene.position);
    // RENDERER
    if ( Detector.webgl )
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    else
        renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.getElementById( 'ThreeJS' );
    container.appendChild( renderer.domElement );
    // EVENTS
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
    // CONTROLS
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    // STATS
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild( stats.domElement );
    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0,250,0);
    scene.add(light);
    // FLOOR
    var floorTexture = new THREE.ImageUtils.loadTexture( 'images/square2.png' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 40, 40 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide, opacity: 0.2} );
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -30;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
    // SKYBOX/FOG
    var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
    var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    // scene.add(skyBox);
    scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

    ////////////
    // CUSTOM //
    ////////////


    //////////////////////////////////////////////////////////////////////

    // this material causes a mesh to use colors assigned to vertices
    //   different colors at face vertices create gradient effect
    var cubeMaterial = new THREE.MeshBasicMaterial(
        { color: 0xffffff, vertexColors: THREE.VertexColors } );

    var color, face, numberOfSides, vertexIndex;

    // faces are indexed using characters
    var faceIndices = [ 'a', 'b', 'c', 'd' ];

    for ( var k = 0; k < cells.length; k++ )
    {
        // randomly color cube
        tetGeometry[k] = new THREE.TetrahedronGeometry(40);
        for ( var i = 0; i < tetGeometry[k].faces.length; i++ )
        {
            face  = tetGeometry[k].faces[ i ];
            // determine if current face is a tri or a quad
            numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
            // assign color to each vertex of current face
            for( var j = 0; j < numberOfSides; j++ )
            {
                vertexIndex = face[ faceIndices[ j ] ];
                // initialize color variable
                color = new THREE.Color( 0xffffff );
                color.setHSL( color_t[cells[k][vertexIndex]], 1, 0.5 );
                face.vertexColors[ j ] = color;
            }
        }
        tets[k] = new THREE.Mesh( tetGeometry[k], cubeMaterial );
        //tets[k].position.set(0, 0, 0);
        tets[k].geometry.vertices[0].x = points[cells[k][0]][0];
        tets[k].geometry.vertices[0].y = points[cells[k][0]][1];
        tets[k].geometry.vertices[0].z = points[cells[k][0]][2];

        tets[k].geometry.vertices[1].x = points[cells[k][1]][0];
        tets[k].geometry.vertices[1].y = points[cells[k][1]][1];
        tets[k].geometry.vertices[1].z = points[cells[k][1]][2];

        tets[k].geometry.vertices[2].x = points[cells[k][2]][0];
        tets[k].geometry.vertices[2].y = points[cells[k][2]][1];
        tets[k].geometry.vertices[2].z = points[cells[k][2]][2];

        tets[k].geometry.vertices[3].x = points[cells[k][3]][0];
        tets[k].geometry.vertices[3].y = points[cells[k][3]][1];
        tets[k].geometry.vertices[3].z = points[cells[k][3]][2];
        scene.add(tets[k]);
    }
    //////////////////////////////////////////////////////////////////////

}

function animate()
{
    requestAnimationFrame( animate );
    render();
    update();
}

function update()
{
    if ( keyboard.pressed("z") )
    {
        // do something
    }

    controls.update();
    stats.update();
}

function render()
{
    renderer.render( scene, camera );
}