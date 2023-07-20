import {makeAutoObservable} from 'mobx';

class CanvasState {
    canvas: HTMLCanvasElement | null;
    soket = null;
    sessionId = null;
    undoList: string[] = [];
    redoList: string[] = [];
    username: string = '';

    constructor() {
        this.canvas = null;
        makeAutoObservable(this);
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

     setSocket(socket) {
        this.soket = socket;
    }

     setSessionId(session) {
        this.sessionId = session;
    }

    setUsername(username: string) {
        this.username = username;
    }

    pushToUndo(data: string) {
        this.undoList.push(data);
    }

    pushToRedo(data: string) {
        this.redoList.push(data);
    }

    undo() {
        if(this.canvas) {
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
    }

    redo() {
        if (this.canvas) {
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
                    }             
                }
            } else {
                console.log('нет действий для повторного применения');
            }
        }
    }
}

export default new CanvasState();
