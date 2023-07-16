import BrushTool from './BrushTool';

export default class EraiserTool extends BrushTool {
	color: string;
	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
	}

	draw(x: number, y: number) {
		this.ctx.strokeStyle = 'white';
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}
}
