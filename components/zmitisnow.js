export default class ZmitiSnow {
	constructor(option = {}) {
		this.x = option.x;
		this.y = option.y;
		this.r = option.r || Math.random() + 1.3;
		this.opacity = Math.random() + .3;
		this.alive = true;
		this.context = option.cxt;
		this.color = option.color;
		this.width = option.cxt.canvas.width;
		this.height = option.cxt.canvas.height;
		this.speedY = Math.random() * 2 + 1;
		this.speedX = Math.random() * 2 - .5;
		this.draw();
	}
	draw() {
		var context = this.context;
		var opacity = this.opacity.toFixed(2);
		context.fillStyle = this.color || 'rgba(255,255,255,' + opacity + ')';
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
		context.closePath();
		context.fill();
	}
	die() {
		var context = this.context;
		context.clearRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2)
	}

	fly(fn) {

		this.y += this.speedY;
		this.x += this.speedX;
		if (this.x > this.width || this.x < 0) {

		}
		if (this.x > this.width) {
			this.x = 0;
		}
		if (this.x < 0) {
			this.x = this.width;

		}
		fn && fn();
		this.draw(this.context);


		if (this.y > this.height + this.r * 2) {
			this.y = 0;
		}
	}

}