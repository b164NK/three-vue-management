window.onload = function(){
	//タッチイベントが利用可能かどうかの判別
	var supportTouch = 'ontouchend' in document;

	//イベント名の決定
	var EVENTNAME_START = supportTouch? 'touchstart':'mousedown';
	var EVENTNAME_MOVE = supportTouch? 'touchmove':'mousemove';
	var EVENTNAME_END = supportTouch? 'touchend':'mouseup';

	var el_myCanvas = document.getElementById('myCanvas');
	var clientRect = el_myCanvas.getBoundingClientRect();

	//↓　x,y座標の基準点を決める
	//ページの左端から要素の左端までの距離
	var positionX = clientRect.left + clientRect.width/2 + window.pageXOffset ;
	//ページの上端から要素の上端までの距離
	var positionY = clientRect.top + clientRect.height/2 + window.pageYOffset ;

	new Vue({
			el:"#app",
			data: {
				//three.js関連
				scene : new THREE.Scene(),
				renderer : new THREE.WebGLRenderer({antialias: true}),
				camera :  new THREE.PerspectiveCamera(45,1,1,10000),
				light : new THREE.DirectionalLight(0xFFFFFF, 1),
				geometry : new THREE.BoxGeometry(400, 400, 400),
				material : new THREE.MeshNormalMaterial(),
				cube : 0,
				//touch操作関連
				pointX: 0,
				pointY: 0,
				myText: '画面をタッチしてください',
				bgcolor: 'lightblue',
				eventstart: EVENTNAME_START,
				eventmove: EVENTNAME_MOVE,
				eventend: EVENTNAME_END
			},
			methods:{
				handleStart:function(e){
					this.bgcolor = 'orange';
					this.myText = 'タッチ中';
					if(this.eventstart == 'touchstart'){
						this.pointX = e.changedTouches[0].pageX - positionX;
						this.pointY = e.changedTouches[0].pageY - positionY;
						this.$set(this.cube.rotation,'x', this.cube.rotation.x+ this.pointY / 10000);
						this.$set(this.cube.rotation,'y', this.cube.rotation.y+ this.pointX / 10000);
					}else if(this.eventstart == 'mousedown'){
						this.pointX = e.pageX - positionX;
						this.pointY = e.pageY - positionY;
						this.$set(this.cube.rotation,'x', this.cube.rotation.x+ this.pointY / 10000);
						this.$set(this.cube.rotation,'y', this.cube.rotation.y+ this.pointX / 10000);
					}
				},
				handleMove:function(e){
					if(this.bgcolor == 'orange'){
						if(this.eventmove == 'touchmove'){
							e.preventDefault();
							this.pointX = e.changedTouches[0].pageX - positionX;
							this.pointY = e.changedTouches[0].pageY - positionY;
							this.$set(this.cube.rotation,'x', this.cube.rotation.x+ this.pointY / 10000);
							this.$set(this.cube.rotation,'y', this.cube.rotation.y+ this.pointX / 10000);
						}else if(this.eventmove == 'mousemove'){
							this.pointX = e.pageX - positionX;
							this.pointY = e.pageY - positionY;
							this.$set(this.cube.rotation,'x', this.cube.rotation.x+ this.pointY / 10000);
							this.$set(this.cube.rotation,'y', this.cube.rotation.y+ this.pointX / 10000);
						}
					}
				},
				handleEnd:function(e){
					this.bgcolor = 'lightblue';
					this.myText = '画面をタッチしてください';
					this.pointX = 0;
					this.pointY = 0;
				}
			},
			mounted() {
				let canvas = document.getElementById('myCanvas');
				canvas.appendChild(this.renderer.domElement);
				this.renderer.setPixelRatio(window.devicePixelRatio);
				this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
				this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
				this.camera.position.z = 1000;
				this.cube = new THREE.Mesh(this.geometry,this.material);

				this.scene.add(this.camera);
				this.scene.add(this.light);
				this.scene.add(this.cube);

				this.renderer.render(this.scene, this.camera);
				console.log("from mounted");

			},
			updated(){
				this.renderer.render(this.scene, this.camera);
				console.log("from updated");

			}
	});
};
