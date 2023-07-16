import {makeAutoObservable} from 'mobx';
import Tools from '../tools/Tools';

class ToolState {
    tool: Tools | null = null;
    strokeColor: string = '#000000';
    fillColor: string = '#000000';

    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool: Tools) {
        this.tool = tool;
    }

    setFillColor(color: string) {
        if (this.tool) {
            this.tool.fillColor = color;
            this.fillColor = color;
        }
    }

    setStrokeColor(color: string) {
        if (this.tool) {
            this.tool.strokeColor = color;
            this.strokeColor = color;
        }
    }

    setLineWidth(width: number) {
        if (this.tool) {
            this.tool.lineWidth = width;
        }
    }
}

export default new ToolState();
