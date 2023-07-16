import {makeAutoObservable} from 'mobx';

class CanvasState {
    canvas: HTMLCanvasElement;
    undoList: string[] = [];
    redoList: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    pushToUndo(data: string) {
        this.undoList.push(data);
    }

    pushToRedo(data: string) {
        this.redoList.push(data);
    }

    undo() {
        const ctx = this.canvas.getContext('2d');
        if (this.undoList.length) {
            const lastState = this.undoList.pop();
            if (ctx && lastState && this.canvas) {
                this.redoList.push(this.canvas.toDataURL());
                const img = new Image();
                img.src = lastState;
                img.onload = () => {
                    ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
                    ctx.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
                };
            }
        } else {
            console.log('нет действий для отмены');
        }
    }

    redo() {
        if ('getContext' in this.canvas) {
            const ctx = this.canvas.getContext('2d');
            if (this.redoList.length) {
                const lastState = this.redoList.pop();
                if (ctx && lastState && this.canvas) {
                    this.undoList.push(this.canvas.toDataURL());
                    const img = new Image();
                    img.src = lastState;
                    img.onload = () => {
                        ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
                        ctx.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
                    };
                    this.undoList.push(lastState);
                }
            } else {
                console.log('нет действий для повторного применения');
            }
        }

    }
}

export default new CanvasState();
