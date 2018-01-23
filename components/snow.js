import imgs from './assets.js';
import $ from 'jquery';
var viewW = document.documentElement.clientWidth,
	viewH = document.documentElement.clientHeight;
export default class ZmitiSnow {
	constructor() {
		this.transX = 0;
		this.transY = 0;
		this.speedY = Math.random() * 2 + 1;
		this.speedX = Math.random() * (Math.random() - .5 > 0 ? 1 : -1);

		this.size = (Math.random() * 4 + 3) | 0;

		this.id = this.randomString();
		this.html = this.create();


	}

	randomString(len) {　
		var len = len || 8;　　
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
		var maxPos = $chars.length;　　
		var pwd = '';　　
		for (var i = 0; i < len; i++) {　　　　
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
		}　　
		return pwd;
	}

	create() {
		var html = ` <div id='${this.id}' class="zmiti-snow" style="left:${Math.random()*viewW}px;width:${this.size}px;height:${this.size}px;top:-30px;opacity:${Math.random()+.4}">
            
          </div>`;
		return html;
	}
	animate() {


		if (this.dom && this.dom.length > 0) {
			this.transY += this.speedY;
			this.transX += this.speedX;

			if (this.transX > viewW + 20) {
				this.transX = 0;
			}
			if (this.transX < -20) {
				this.transX = viewW;
			}
			if (this.transY > viewH + 20) {
				this.transY = 0;
			}

			this.dom.css({
				'transform': 'translate3d(' + this.transX + 'px,' + this.transY + 'px,0)'
			})

		} else {
			this.dom = $('#' + this.id);
		}

	}
}