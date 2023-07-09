import {useEffect} from 'react';
import Brush from '../../assets/menu-svg/brush.svg';
import Circle from '../../assets/menu-svg/circle.svg';
import Eraser from '../../assets/menu-svg/eraser.svg';
import Line from '../../assets/menu-svg/line.svg';
import Rectangle from '../../assets/menu-svg/rect.svg';
import Redo from '../../assets/menu-svg/redo.svg';
import Save from '../../assets/menu-svg/save.svg';
import Undo from '../../assets/menu-svg/undo.svg';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';
import BrushTool from '../../tools/BrushTool';
import RectangleTool from '../../tools/Rectangle';
import cls from './Toolbar.module.css';

export const Toolbar = () => {

    return (
        <div className={cls.Toolbar}>
            <div className={cls.tools}>
                <button className={cls.btn} onClick={() => toolState.setTool(new BrushTool(canvasState.canvas))}><Brush/></button>
                <button className={cls.btn} onClick={() => toolState.setTool(new RectangleTool(canvasState.canvas))}><Rectangle/></button>
                <button className={cls.btn}><Circle/></button>
                <button className={cls.btn}><Eraser/></button>
                <button className={cls.btn}><Line/></button>
                <div className={cls.colorBg}>
                    <input type={'color'} className={cls.btn}/>
                </div>
            </div>
            <div className={cls.tools}>
                <button className={cls.btn}><Undo/></button>
                <button className={cls.btn}><Redo/></button>
                <button className={cls.btn}><Save/></button>
            </div>

        </div>
    );
};


