import Brush from '/src/assets/menu-svg/brush.svg';
import {useContext} from 'react';
import Circle from '../../assets/menu-svg/circle.svg';
import Eraser from '../../assets/menu-svg/eraser.svg';
import Line from '../../assets/menu-svg/line.svg';
import Rectangle from '../../assets/menu-svg/rect.svg';
import Redo from '../../assets/menu-svg/redo.svg';
import Save from '../../assets/menu-svg/save.svg';
import Undo from '../../assets/menu-svg/undo.svg';
import {ColorsContext} from '../../Context/Context.js';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';
import BrushTool from '../../tools/BrushTool.js';
import CircleTool from '../../tools/CircleTool';
import EraserTool from '../../tools/EraizerTool';
import LineTool from '../../tools/LineTool';
import RectangleTool from '../../tools/RectangleTool';
import cls from './Toolbar.module.css';

export const Toolbar = () => {
    const colors = useContext(ColorsContext);

    const setBrush = () => {
        toolState.setTool(new BrushTool(canvasState.canvas, canvasState.socket, canvasState.sessionId));
        if ('stroke' in colors) {
            toolState.setStrokeColor(colors.stroke);
        }
    };

    const setRect = () => {
        toolState.setTool(new RectangleTool(canvasState.canvas, canvasState.socket, canvasState.sessionId));
        if ('stroke' in colors) {
            toolState.setStrokeColor(colors.stroke);
        }
        if ('fill' in colors) {
            toolState.setFillColor(colors.fill);
        }
    };

    const setCircle = () => {
        toolState.setTool(new CircleTool(canvasState.canvas, canvasState.socket, canvasState.sessionId));
        if ('stroke' in colors) {
            toolState.setStrokeColor(colors.stroke);
        }
    };

    const setEraser = () => {
        toolState.setTool(new EraserTool(canvasState.canvas, canvasState.socket, canvasState.sessionId));
    };

    const setLine = () => {
        toolState.setTool(new LineTool(canvasState.canvas, canvasState.socket, canvasState.sessionId));
        if ('stroke' in colors) {
            toolState.setStrokeColor(colors.stroke);
        }
    };

    const undo = () => {
        canvasState.undo();
    };

    const redo = () => {
        canvasState.redo();
    };

    const download = () => {
        const dataUrl = canvasState.canvas?.toDataURL();
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = canvasState.sessionId + '.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className={cls.Toolbar}>
            <div className={cls.tools}>
                <button id="brush" className={cls.btn} onClick={setBrush}>
                    <Brush/>
                </button>
                <button id="rectangle" className={cls.btn} onClick={setRect}>
                    <Rectangle/>
                </button>
                <button id="circle" className={cls.btn} onClick={setCircle}>
                    <Circle/>
                </button>
                <button id="eraser" className={cls.btn} onClick={setEraser}>
                    <Eraser/>
                </button>
                <button id="line" className={cls.btn} onClick={setLine}>
                    <Line/>
                </button>
            </div>
            <div className={cls.tools}>
                <button onClick={undo} title={'Отменить'} id="undo" className={cls.btn}>
                    <Undo/>
                </button>
                <button onClick={redo} title={'Повторить'} id="redo" className={cls.btn}>
                    <Redo/>
                </button>
                <button onClick={download} title={'Сохранить'} id="save" className={cls.btn}>
                    <Save/>
                </button>
            </div>
        </div>
    );
};
