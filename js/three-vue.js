window.onload = function(){

	new Vue({
			el:"#app",
			data: {
				scene : new THREE.Scene(),
				renderer : new THREE.WebGLRenderer({antialias: true}),
				camera :  new THREE.PerspectiveCamera(30,1,1,1000),
				light : new THREE.DirectionalLight(0xFFFFFF, 1),
				geometry : new THREE.BoxGeometry(400, 400, 400),
				material : new THREE.MeshNormalMaterial(),
				cube : new THREE.Mesh(this.geometry,this.material)
			},
			methods:{
				animate(){
					this.renderer.render(this.scene, this.camera);
					requestAnimationFrame(this.animate);
					//console.log();
				}
			},
			mounted() {
				let canvas = document.getElementById('myCanvas');
				canvas.appendChild(this.renderer.domElement);
				this.renderer.setPixelRatio(window.devicePixelRatio);
				this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
				this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
				this.scene.add(this.camera);
				this.scene.add(this.light);
				this.scene.add(this.cube);
				//console.log('mounted acting');

				this.animate();

			}

	});
};
