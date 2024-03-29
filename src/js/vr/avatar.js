export default class Avatar {
	constructor(name, options) {
		var user_id = "user_id",
				data = {},
				mesh = new THREE.Object3D(),
				mat = new THREE.MeshPhongMaterial({color:0xffaf00,
																					specular: 0xffffff,
																					shininess: 30,
																					 shading: THREE.FlatShading}),
				tailGeom = new THREE.BoxGeometry(400, 40, 400),
				bodyGeom = new THREE.BoxGeometry(400, 160, 600),
				headGeom = new THREE.BoxGeometry(600, 40, 600),
				wingGeom = new THREE.BoxGeometry(600, 600, 40),
				tail = new THREE.Mesh(tailGeom, mat),
				body = new THREE.Mesh(bodyGeom, mat),
				head = new THREE.Mesh(headGeom, mat),
				wing = null,
				wings = [],
				userShield = null,
				videoFace = null,
        arm = null,
				arms = [],
        a = 0;

				tail.position.y = -300;
				tail.position.z = 400;
				head.position.y = 300;
				head.position.z = -200;

				tail.rotation.x = Math.PI / 5;
				body.rotation.x = Math.PI / 5;
				head.rotation.x = 2 * Math.PI / 3;

				mesh.add(tail);
				mesh.add(body);
				mesh.add(head);

				while (a < 2) {
					wing = new THREE.Mesh(wingGeom, mat);
					wing.rotation.y = Math.PI / 2;
					wing.rotation.x = Math.PI / 5;
					wing.rotation.z = Math.PI / 5;
					wing.position.set(-400+(800*a), 0, 0);
					wings.push(wing);
					mesh.add(wing);
					a++;
				}
				a = 0;

				for (a = 0; a < 2; a++) {
						arm = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 350), new THREE.MeshBasicMaterial({wireframe: true, color:0xffffff}));
						arm.position.set(-150+(a*300), -180, -300);
						arm.visible = false;
						arms.push(arm);
						mesh.add(arm);
				}

        if (!! options) {
            if (!! options.profilePicture) {
								var img = document.createElement('img');
								img.onload = function (e) {
									var face = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600), new THREE.MeshBasicMaterial({side:2, color: 0xffffff, map: new THREE.Texture(e.target)}));
									face.material.map.needsUpdate = true;
									videoFace = face;
									face.position.set(0, 0, -800);
									mesh.add(face);
								};
								img.crossOrigin = ''; // no credentials flag. Same as img.crossOrigin='anonymous'
								img.src = options.profilePicture;
						}
        }

        this.mesh = mesh;
				mesh.autoUpdateMatrix = false;
				three.scene.add(mesh);

		 return {
				name: name,
				user_id: user_id,
				data: data,
				arms: arms,
				mesh: mesh,
				tail: tail,
				body: body,
				head: head,
				wings: wings,
				videoFace: videoFace,
				bodyVisible: true,
				toggleBody: function (set) {
					this.mesh.children[2].visible = set;
					this.mesh.children[3].visible = set;
					this.mesh.children[4].visible = set;
				},
				updateImage: function (image) {
						var face = this.videoFace,
								avatar = mesh;

						avatar.remove(face);
						var img = document.createElement('img');
						img.onload = function (e) {
							var face = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600),
							 													new THREE.MeshBasicMaterial({side:2, color: 0xffffff, map: new THREE.Texture(e.target)}));
							face.material.map.needsUpdate = true;
							avatar.videoFace = face;
							face.position.z = -800;
							avatar.add(face);
						};
						img.crossOrigin = '';
						img.src = image;
				}
		 }
	}
}
