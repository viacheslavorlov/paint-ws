import Tools from './Tools';

export default class LineTool extends Tools {
	private startX: number;
	private startY: number;
	private memoizedImage: string;
	constructor(canvas, socket, id) {
		super(canvas, socket, id);
		this.listen();
	}

	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
	}

	mouseUpHandler() {
		this.paint = false;
	}

	mouseDownHandler(e: MouseEvent) {
		this.paint = true;
		this.ctx.beginPath();
		this.startX = e.clientX - Number(window.getComputedStyle(this.canvas).marginLeft.replace('px', ''));
		this.startY = e.clientY - this.canvas.offsetTop;
		this.memoizedImage = this.canvas.toDataURL();
	}

	mouseMoveHandler(e: MouseEvent) {
		if (this.paint) {
			let currentX = e.pageX - Number(window.getComputedStyle(this.canvas).marginLeft.replace('px', ''));
			let currenty = e.pageY - this.canvas.offsetTop;
			this.draw(this.startX, this.startY, currentX, currenty);
		}
	}

	draw(x, y, endX, endY) {
		const img = new Image();
		img.src = this.memoizedImage;
		img.onload = async function () {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			this.ctx.beginPath();
			this.ctx.moveTo(x, y);
			this.ctx.lineTo(endX, endY);
			this.ctx.stroke();
		}.bind(this);
	}
}
