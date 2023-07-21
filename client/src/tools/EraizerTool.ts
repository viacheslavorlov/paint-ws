import BrushTool from './BrushTool';

export default class EraiserTool extends BrushTool {
	constructor(canvas, socket, id) {
		super(canvas, socket, id);
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
                    type: 'eraser',
                    x: e.pageX - Number(window.getComputedStyle(this.canvas).marginLeft.replace('px', '')),
                    y: e.clientY - this.canvas.offsetTop,
                }
            }))
        }
    }

	static draw(ctx, x: number, y: number) {
		ctx.strokeStyle = 'white';
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}
