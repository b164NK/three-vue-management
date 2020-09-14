window.onload = function(){

	new Vue({
			el:"#app",
			data: {
				windowWidth: 0,
				windowHeight: 0,
				scene : new THREE.Scene(),
				renderer : new THREE.WebGLRenderer(),
				camera : new THREE.PerspectiveCamera(45,300,200),
				light : new THREE.AmbientLight(0xffffff,1.0),
				geometry : new THREE.BoxGeometry(400, 400, 400),
				material : new THREE.MeshNormalMaterial(),
				cube : new THREE.Mesh(this.geometry,this.material),
			},
			methods:{
				getWindowWidth: function( e ) {
					this.windowWidth = document.documentElement.clientWidth;
				},
				getWindowHeight: function( e ) {
					this.windowHeight = document.documentElement.clientHeight;
				},
				animate(){
					this.renderer.render(this.scene, this.camera);
					requestAnimationFrame(this.animate);
					//console.log('acting');
				}
			},
			created(){
				this.scene.add(this.camera);
				this.scene.add(this.light);
				this.scene.add(this.cube);
			},
			beforeMount() {
				window.addEventListener("resize", this.getWindowWidth );
				window.addEventListener("resize", this.getWindowHeight );
			},
			mounted: function(){

			},
			beforeDestroy() {
				window.removeEventListener("resize", this.getWindowWidth );
				window.removeEventListener("resize", this.getWindowHeight );
			}

	});
};
