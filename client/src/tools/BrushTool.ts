import Tools from './Tools';

export default class BrushTool extends Tools {
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
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish',
            }
        }))
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
			// this.draw(
			// 	e.pageX - Number(window.getComputedStyle(this.canvas).marginLeft.replace('px', '')),
			// 	e.clientY - this.canvas.offsetTop,
			// );
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'brush',
                    x: e.pageX - Number(window.getComputedStyle(this.canvas).marginLeft.replace('px', '')),
                    y: e.clientY - this.canvas.offsetTop,
                }
            }))
		}
	}

	static draw(ctx, x, y) {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}
