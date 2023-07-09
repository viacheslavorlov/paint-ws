import Tools from './Tools';

export default class BrushTool extends Tools {
    constructor(canvas) {
        super(canvas);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.paint = false;
    }

    mouseDownHandler(e: MouseEvent) {
        this.paint = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop);
    }

    mouseMoveHandler(e) {
        if (this.paint) {
            this.draw(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop);
        }
    }

    draw(x, y) {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        console.log('draw');
    }

}
