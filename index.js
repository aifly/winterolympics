import Vue from "vue";
import Main from './components/main.vue'
import Index from './components/index.vue';
import Obserable from './components/obserable.js';
import imgs from './components/assets.js'
import $ from 'jquery';
var obserable = new Obserable();


//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	data: {
		obserable,
		music: './assets/music/bg.mp3',
		rotate: false,

		imgs

	},
	el: '#app',
	template: `<div>
		<Main :obserable='obserable'></Main>
		<Index :obserable='obserable'></Index>

		<audio :src='music' autoplay ref='audio' loop></audio>
		<div @click='toggleMusic' class='zmiti-play' :class='{"rotate":rotate}'>
			<img :src='imgs.play'/>
		</div>
	</div>`,
	methods: {

		loading: function(arr, fn, fnEnd) {
			var len = arr.length;
			var count = 0;
			var i = 0;

			function loadimg() {
				if (i === len) {
					return;
				}
				var img = new Image();
				img.onload = img.onerror = function() {
					count++;
					if (i < len - 1) {
						i++;
						loadimg();
						fn && fn(i / (len - 1), img.src);
					} else {
						fnEnd && fnEnd(img.src);
					}
				};
				img.src = arr[i];
			}
			loadimg();
		},
		toggleMusic() {
			var music = this.$refs['audio'];
			music[music.paused ? 'play' : 'pause']()
		},
		updatePv() {
			$.ajax({
				url: window.protocol + '//api.zmiti.com/v2/custom/update_pvnum/',
				type: 'post',
				data: {
					//isrand: 0,
					customid: 35
				}
			});
		}
	},
	components: {
		Main,
		Index
	},
	mounted() {
		this.updatePv();
		var arr = [];
		for (var attr in imgs) {
			arr.push(imgs[attr]);
		}

		this.loading(arr, (s) => {
			obserable.trigger({
				type: 'loading',
				data: s * 100 | 0
			})
		}, () => {
			obserable.trigger({
				type: 'loaded'
			})
		})


		$(this.$refs['audio']).on('play', () => {
			this.rotate = true;
		}).on('pause', () => {
			this.rotate = false;
		});

		this.$refs['audio'].play();
		var s = this;
		document.addEventListener("WeixinJSBridgeReady", function() {
			WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
				s.$refs['audio'].play();
			});
		}, false);
	}
})