import { makeAutoObservable } from 'mobx';
 class ToolState {
	tool: CanvasRenderingContext2D | null = null;
	constructor() {
		makeAutoObservable(this);
	}
	setTool(tool: CanvasRenderingContext2D) {
		this.tool = tool;
	}
	setFillColor(color: string) {
		if (this.tool) {
			this.tool.fillStyle = color;
		}
	}
	setStrokeColor(color: string) {
		if (this.tool) {
			this.tool.strokeStyle = color;
		}
	}
	setLineWidth(width: number) {
		if (this.tool) {
			this.tool.lineWidth = width;
		}
	}
}
 export default new ToolState();