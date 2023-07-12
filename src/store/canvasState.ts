import { makeAutoObservable } from 'mobx';

class CanvasState {
	canvas = null;
	undoList = [];
	redoList = [];

	constructor() {
		makeAutoObservable(this);
	}

	setCanvas(canvas) {
		this.canvas = canvas;
	}

	pushToUndo(data) {
		this.undoList.push(data);
	}

	pushToRedo(data) {
		this.redoList.push(data);
	}

	undo() {
		const ctx = this.canvas.getContext('2d');
		if (this.undoList.length) {
			const lastState = this.undoList.pop();
			this.redoList.push(this.canvas.toDataURL());
			const img = new Image();
			img.src = lastState;
			img.onload = () => {
				ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			};
		} else {
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			console.log('нет действий для отмены');
		}
	}

	redo() {
		const ctx = this.canvas.getContext('2d');
		if (this.redoList.length) {
			const lastState = this.redoList.pop();
			this.undoList.push(this.canvas.toDataURL());
			const img = new Image();
			img.src = lastState;
			img.onload = () => {
				ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			};
			this.undoList.push(lastState);
		} else {
			console.log('нет действий для повторного применения');
		}
	}
}

export default new CanvasState();
