import Cell from './vr/cell.js';
import Chunk from './vr/chunk.js';
import Tile from './vr/tile.js';
import Avatar from './vr/avatar.js';

export default class World {
	constructor() {
		var scene = new THREE.Scene(),
				camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 100, 800000 ),
				renderer = new THREE.WebGLRenderer(),
				mobile = app.mobile,
				self = this,
				sunGeom = new THREE.OctahedronGeometry(16000, 0),
				material = new THREE.MeshBasicMaterial( {color: 0xffffff, opacity: 0.9, transparent: true} ),
				sun = new THREE.Mesh(sunGeom, material),
				light = new THREE.PointLight(0xfcfcff, 2, 900000),
				panelMat = new THREE.MeshLambertMaterial({ color: 0xe1e1e1 }),
				cellGeometry = new THREE.CylinderGeometry(192, 192, 128, 6),
				cell = null,
				x = 0,
				y = 0,
				r = 4000;

		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );
		renderer.domElement.setAttribute("id", "viewport");

		this.three = {
			sun: sun,
			scene: scene,
			chunks: [],
			camera: camera,
			renderer: renderer
		};

		window.three = this.three;

		scene.fog = new THREE.FogExp2(0xffffff, 0.000005);
		// light.position.set(0, 60000, -32000);
		renderer.setClearColor(0x2B7CA1);
		camera.position.set(0, 4500, 15);
		this.skybox = null;

		function render (last) {
			var sys = app,
				camera = three.camera,
				delta = ((Date.now() - last) / 10000),
				time = (Date.now() / 4600),
				image = "",
				imageSize = [0, 0],
				arms = [],
				userArms = sys.user.arms;

			if (!! sys.userInput) {
				sys.userInput.update(delta);
			}
			if (sys.sendUpdatePacket == 30) { // send image
				if (sys.capturing) {
					var v = document.getElementById('webcam');
					var canvas = document.getElementById('webcam-canvas');
					var context = canvas.getContext('2d');
					var cw = Math.floor(v.videoWidth);
					var ch = Math.floor(v.videoHeight);
					imageSize = [cw, ch];
					canvas.width = 512;
					canvas.height = 512;
					context.drawImage(v, 0, 0, 512, 512);
					sys.webcamImage = canvas.toDataURL("image/jpg", 0.5);
				}
				sys.sendUpdatePacket = 0;
			}

			sys.sendUpdatePacket += 1;
			if (sys.sendUpdatePacket %(2*(mobile ? 2 : 1)) == 0 && sys.mode == "vr") {

				if (sys.userInput.leapMotion) {
					userArms.forEach(function (arm) {
						arms.push({pos: [arm.position.x, arm.position.y, arm.position.z],
											quat: [arm.quaternion.x, arm.quaternion.y, arm.quaternion.z, arm.quaternion.w] });
					});
				}
				socket.emit('user update', {username:sys.username, image: sys.webcamImage, imageSize: imageSize, arms: arms, position: {x:camera.position.x, y:camera.position.y, z: camera.position.z},
																	 quaternion: {x: camera.quaternion.x, y: camera.quaternion.y, z: camera.quaternion.z, w:camera.quaternion.w}});
				if (sys.capturing) {
					sys.webcamImage = "";
				}

			}
			sun.rotation.x += 0.0025;
			sun.rotation.y += 0.005;
			sys.world.skybox.position.set(camera.position.x, camera.position.y, camera.position.z);
			renderer.render(scene, camera);
			last = Date.now();
			requestAnimationFrame( function () { render(last); } );
		};

		var skyTexture = THREE.ImageUtils.loadTexture("/images/depth-sky-2.jpg", null, function () {
			var skybox = new THREE.Object3D(), // used to use larger jpeg version sunset-5.jpg
			skyboxFace = null,
			skyboxSideMat = new THREE.MeshBasicMaterial({
				map: skyTexture,
				side: 1,
				fog: false,
				color: 0xffffff // too dark.. not dark enough? 0x60daff//  0x80faff too green
			}),
			x = 0;
			skybox = new THREE.Mesh(new THREE.OctahedronGeometry(750000, 4), skyboxSideMat);
			self.skybox = skybox;
			skybox.add(light);
			skybox.add(three.sun);
			three.sun.position.set(0, 120000, -380000);
			light.position.set(0, 250000, -250000);
			three.scene.add(skybox);
			skybox.position.set(three.camera.position.x, 0, three.camera.position.z);
			skyTexture.needsUpdate = true;

			render(0);
		});

		var configure = {
			baseURL: 'https://vpylon.net',
			timeout: 1000,
			headers: {'x-access-token': localStorage.getItem("token")}
		};

		//load cells
		axios.get('/api/cells/all', configure)
		.then(function (response) {
			app.cells = response.data;
			app.cells.forEach(function (userCell){
				//var cell = new Cell(userCell.cell);
			});
		})
		.catch(function (response) {
			console.log(response);
		});

		function bufferChunks (force, phase) {
			var chunks = app.chunks,
					physicsChunks = [],
					removePhysicsChunks = [],
					chunkPos = [],
				cMap = app.chunkMap,
				position = three.camera.position,
				chunk = null,
				c = 0,
				coords = [Math.floor(position.x/37200), 0, Math.floor(position.z/33255.375505322445)],
				lastCoords = app.lastChunkCoords,
				moveDir = [coords[0]-lastCoords[0], coords[2] - lastCoords[2]],
				viewDistance = (app.mobile ? 4 : (window.innerWidth > 2100 ?  12  : 8)),
				removeDistance = viewDistance,
				endCoords = [coords[0]+viewDistance, coords[2]+viewDistance],
				x = coords[0]-phase,
				y = coords[2]-phase;
				app.chunkCoords = coords;

			if (!!force || coords[0] != lastCoords[0] || coords[1] != lastCoords[1] || coords[2] != lastCoords[2]) {
				// remove old chunks
				for (c in chunks) {
					chunk = chunks[c];
					if (chunk.cell[0] < coords[0] - removeDistance || chunk.cell[0] > coords[0] + removeDistance ||
						chunk.cell[2] < coords[2] - removeDistance || chunk.cell[2] > coords[2] + removeDistance) {
							// remove this chunk
							three.scene.remove(chunk.mesh);
							removePhysicsChunks.push({coords: [chunk.cell[0], 0, chunk.cell[2]]});
							delete cMap[chunk.cell[0]+".0."+chunk.cell[2]];
							chunks.splice(c, 1);
						}
					}
					// load new chunks
					while (x <= endCoords[0]) {
						while (y <= endCoords[1]) {
							if (( Math.abs(x%6) > 2 && Math.abs(y%6) > 2) && cMap[x+".0."+y] == null) { // only if its not already loaded
								chunk = new Chunk([x, 3+(Math.sin(x/2)*Math.cos(y/2))*3, y], mobile);
								chunk.mesh.updateMatrix();
								chunks.push(chunk);
								cMap[x+".0."+y] = chunk;
								three.scene.add(chunk.mesh);

								chunkPos = chunk.mesh.position;
								physicsChunks.push({coords: [x, 0, y], position: [chunkPos.x, chunkPos.y, chunkPos.z]});
							}
							y += 1;
						}
						y = coords[2]-viewDistance;
						x += 1;
					}

				}

				if (physicsChunks.length > 0) {
					app.worldPhysics.postMessage('{"command":"add chunks","data":'+JSON.stringify(physicsChunks)+'}');
				}
				if (removePhysicsChunks.length > 0) {
					app.worldPhysics.postMessage('{"command":"remove chunks","data":'+JSON.stringify(removePhysicsChunks)+'}');
				}

				lastCoords[0] = coords[0];
				lastCoords[1] = coords[1];
				lastCoords[2] = coords[2];
				phase ++;

				if (phase > viewDistance) {
					phase = 1;
				}
				setTimeout(function () { bufferChunks(force, phase); }, 500);
			}

			this.bufferChunks = bufferChunks;
			this.buffering = 0;
		}

	};
