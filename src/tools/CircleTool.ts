import Tools from './Tools';

export default class CircleTool extends Tools {
	private startX: number;
	private startY: number;
	private memoizedImage: string;
	constructor(canvas) {
		super(canvas);
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
			let currentY = e.pageY - this.canvas.offsetTop;
			let width = currentX - this.startX;
			let height = currentY - this.startY;
			let radius = Math.sqrt(width ** 2 + height ** 2);
			this.draw(this.startX, this.startY, radius);
		}
	}

	draw(x, y, radius) {
		const img = new Image();
		img.src = this.memoizedImage;
		img.onload = () => {
			console.log(this.ctx.fillStyle);
			console.log(this.ctx.strokeStyle);
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			this.ctx.beginPath();
			this.ctx.arc(x, y, radius, 0, 360);
			this.ctx.stroke();
		};
	}
}
