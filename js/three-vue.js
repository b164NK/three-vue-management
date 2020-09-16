window.onload = function(){

	new Vue({
			el:"#app",
			data: {
				scene : new THREE.Scene(),
				renderer : new THREE.WebGLRenderer({antialias: true}),
				camera :  new THREE.PerspectiveCamera(45,1,1,10000),
				light : new THREE.DirectionalLight(0xFFFFFF, 1),
				geometry : new THREE.BoxGeometry(400, 400, 400),
				material : new THREE.MeshNormalMaterial(),
				//cube : new THREE.Mesh(this.geometry,this.material
				// ↑「cubeについては、geometry及びmaterialがこの時点では
				//使えないため０とおくしかない」
				cube : 0
			},
			methods:{
				animate(){
					this.renderer.render(this.scene, this.camera);
					this.cube.rotation.x += 0.01;
					this.cube.rotation.y += 0.02;
					this.cube.rotation.z += 0.03;
					requestAnimationFrame(this.animate);

					//console.log('acting...');
				}
			},
			mounted() {
				let canvas = document.getElementById('myCanvas');
				canvas.appendChild(this.renderer.domElement);
				this.renderer.setPixelRatio(window.devicePixelRatio);
				this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
				this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
				//カメラの初期ポジションは(0,0,0)で[-z]方向を向いている
				this.camera.position.z = 1000;
				this.cube = new THREE.Mesh(this.geometry,this.material);

				this.scene.add(this.camera);
				this.scene.add(this.light);
				this.scene.add(this.cube);

				//console.log(this.camera.position);
				//console.log(this.scene.children);
				//console.log(this.cube);

				this.animate();

			}

	});
};
