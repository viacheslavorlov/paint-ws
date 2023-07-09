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
            <canvas style={{zoom: '100%'}} ref={canvasRef} height={480} width={840}/>
        </div>
    );
});


