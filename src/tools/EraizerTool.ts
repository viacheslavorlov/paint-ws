import BrushTool from './BrushTool';

export default class EraiserTool extends BrushTool {
	constructor(canvas) {
		super(canvas);
	}

	draw(x, y) {
		this.ctx.strokeStyle = 'white';
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}
}
