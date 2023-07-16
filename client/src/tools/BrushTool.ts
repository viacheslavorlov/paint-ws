import Tools from './Tools';

export default class BrushTool extends Tools {
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
		this.ctx.moveTo(
			e.pageX - Number(window.getComputedStyle(this.canvas).marginLeft.replace('px', '')),
			e.clientY - this.canvas.offsetTop,
		);
	}

	mouseMoveHandler(e: MouseEvent) {
		if (this.paint) {
			this.draw(
				e.pageX - Number(window.getComputedStyle(this.canvas).marginLeft.replace('px', '')),
				e.clientY - this.canvas.offsetTop,
			);
		}
	}

	draw(x, y) {
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}
}
