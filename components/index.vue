<template>
	<div class="zmiti-index-main-ui lt-full" v-if='render' :class='{"hide":hide}' :style='{background: "url("+imgs.index+") no-repeat center bottom",backgroundSize:"cover"}'>
		

		<div class="zmiti-index-title">
			<img :src="imgs.title" alt="">
		</div>

		<div @click="entryMain" class="zmiti-index-start">
			<img :src="imgs.start" alt="">
		</div>

		<canvas ref="canvas" :width='viewW' :height='viewH'></canvas>

		<div class="zmiti-tree1">
			<img :src="imgs.tree1" alt="">
		</div>


		<div class="zmiti-tree2">
			<img :src="imgs.tree2" alt="">
		</div>

		<div class="zmiti-snows" :style="{opacity:snowOpacity,WebkitTransform:'scaleY('+scaleY+')'}">
			
		</div>

	</div>
</template>

<script>
	import './css/index.css';
	import imgs from './assets.js';
	import ZmitiSnow from './zmitisnow.js';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				hide:false,
				render:true,
				snowOpacity:0,
				scaleY:1,
			}
		},
		methods:{
			initCanvas(){
				var canvas = this.$refs['canvas'];
				var context = canvas.getContext('2d');
				



				var snowArr = [];
	  	  		var t = setInterval(()=>{
	  	  			if(snowArr.length>=200){
	  	  				clearInterval(t);
	  	  			}
	  	  			snowArr.push(new ZmitiSnow({
	  			  		x:Math.random()*this.viewW,
	  	          		y:-Math.random()*200+50,
	  			  		cxt:context
	  			  	}));
	  	  		},50)

	  	  		var zmitiRequestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

	  	  		var rem = this.viewW/10;
	  	  		var scale = .002;

	  	  		var render =()=>{
	  	  		 	context.clearRect(0, 0, this.viewW, this.viewH)
	    			 snowArr.forEach(snow=>{
		  				snow.alive && snow.fly()
		  			});
	    			this.snowOpacity+=scale;
	    			if(this.snowOpacity>=1 || this.snowOpacity<=0){
	    				scale*=-1;
 
	    			}
	    			this.render &&  zmitiRequestAnimationFrame(render);
	  	  		 }

	  	  		 render();
			},
			entryMain(){
				
				var {obserable} = this;
				obserable.trigger({
					type:'mainStart'
				})

				this.hide = true;
				setTimeout(()=>{
					this.render = false;
				},1500);
			}
		},
		mounted(){
			this.render && this.initCanvas();
		}
	}
</script>