// conteneur qui va recevoir notre canvas
const container = document.body

// tableau sources des images à utiliser
const images = [
  {
    points: [
      {
        label: 'Bordure de lagune',
        position: {
          x: 244,
          y: 100,
          z: 50
        }
      },
      {
        label: 'Bordure de lagune',
        position: {
          x: 244,
          y: 100,
          z: 50
        },
        image: ''
      }
    ],
    image: 'residenceh201.JPG',
  },
  {
    points: [
      {
        label: 'Bordure de lagune',
        position: {
          x: 244,
          y: 100,
          z: 50
        }
      }
    ],
    image: 'residenceh202.JPG',
  },
  {
    points: [
      {
        label: 'Bordure de lagune',
        position: {
          x: 244,
          y: 100,
          z: 50
        }
      }
    ],
    image: 'residenceh203.JPG',
  },
  {
    points: [
      {
        label: 'Bordure de lagune',
        position: {
          x: 244,
          y: 100,
          z: 50
        }
      }
    ],
    image: 'residenceh204.JPG',
  },
  {
    points: [
      {
        label: 'Bordure de lagune',
        position: {
          x: 244,
          y: 100,
          z: 50
        }
      }
    ],
    image: 'residenceh205.JPG',
  },
  {
    points: [
      {
        label: 'Bordure de lagune',
        position: {
          x: 244,
          y: 100,
          z: 50
        }
      }
    ],
    image: 'residenceh206.JPG',
  },
  {
    points: [
      {
        label: 'Bordure de lagune',
        position: {
          x: 244,
          y: 100,
          z: 50
        }
      }
    ],
    image: 'residenceh207.JPG',
  },
  {
    points: [
      {
        label: 'Bordure de lagune',
        position: {
          x: 244,
          y: 100,
          z: 50
        }
      }
    ],
    image: 'residenceh208.JPG',
  },
]

let currentImageIndex = 0


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000)
camera.position.set(-1, 0, 0)

// renderer webgl
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

// ajouter le canvas a notre page
container.appendChild(renderer.domElement)

// Objet qui sert à se deplacer sur l'image 360
const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.update()


const geometry = new THREE.SphereGeometry(52, 32, 32)
const textureItem = new THREE.TextureLoader()
const material = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide
})
function loadTexture () {
  if (currentImageIndex > (images.length - 1)) {
    currentImageIndex = 0
  }
  let texture = textureItem.load(`../images/${images[currentImageIndex].image}`)
  texture.wrapS = THREE.RepeatWrapping
  texture.repeat.x = -1
  material.map = texture
  currentImageIndex += 1
}
loadTexture()
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// trying raycaster
const raycaster = new THREE.Raycaster()
const  mouse = new THREE.Vector2()

function render() {

	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );
  console.log(intersects)
	// for ( let i = 0; i < intersects.length; i ++ ) {

	// 	intersects[ i ].object.material.color.set( 0xff0000 );

	// }

	//renderer.render( scene, camera );

}

// container.addEventListener('click', (event) => {
//   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// 	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//   console.log(mouse.x, mouse.y)
//   render()
// }, true)

document.querySelector('button#changeImage').addEventListener('click', (event) => {
  camera.zoom = 10
  loadTexture()
})

const animate = () => {
  window.requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()