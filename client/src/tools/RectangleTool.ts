import Tools from './Tools';

export default class RectangleTool extends Tools {
    private startX: number;
    private startY: number;
    private width: number;
    private height: number;
    private memoizedImage: string;

    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler() {
        this.paint = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
            }
        }));
    }

    mouseDownHandler(e: MouseEvent) {
        this.paint = true;
        this.ctx.beginPath();
        this.startX = e.clientX - Number(window.getComputedStyle(this.canvas).marginLeft.replace('px', ''));
        this.startY = e.clientY - this.canvas.offsetTop;
        this.memoizedImage = this.canvas.toDataURL();
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.paint) {
            let currentX = e.pageX - Number(window.getComputedStyle(this.canvas).marginLeft.replace('px', ''));
            let currentY = e.pageY - this.canvas.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.draw(this.startX, this.startY, this.width, this.height);
        }
    }

    draw(x, y, w, h) {
        const img = new Image();
        img.src = this.memoizedImage;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.rect(x, y, w, h);
            this.ctx.fill();
            this.ctx.stroke();
        };
    }

    static staticDraw(ctx, x, y, w, h) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fill();
        ctx.stroke();
    };
}
