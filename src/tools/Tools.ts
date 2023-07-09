export default class Tools {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    paint: boolean;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.destroyEvent()
        this.paint = false
    }

    destroyEvent() {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    }
}
