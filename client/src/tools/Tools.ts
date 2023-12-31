export default class Tools {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    paint: boolean;
    id: string;
    socket: any;

    constructor(canvas: HTMLCanvasElement, socket, id: string) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.paint = false;
        this.socket = socket;
        this.id = id;
        this.destroyEvent();
    }

    set fillColor(color: string) {
        this.ctx.fillStyle = color;
    }

    set strokeColor(color: string) {
        this.ctx.strokeStyle = color;
    }

    set lineWidth(width: number) {
        this.ctx.lineWidth = width;
    }

    destroyEvent() {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    }
}
