import {observer} from 'mobx-react-lite';
import {useEffect, useRef} from 'react';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';
import BrushTool from '../../tools/BrushTool';
import cls from './Canvas.module.css'

export const Canvas = observer(() => {

    const canvasRef = useRef(null)

    useEffect(() => {
        // console.log(canvasRef.current);
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new BrushTool(canvasRef.current))
    }, [])

    return (
        <div className={cls.Canvas}>
            <canvas ref={canvasRef} height={600} width={800}/>
        </div>
    );
});


