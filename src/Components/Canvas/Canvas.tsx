import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';
import BrushTool from '../../tools/BrushTool';
import cls from './Canvas.module.css';

export const Canvas = observer(() => {
	const canvasRef = useRef<null | HTMLCanvasElement>(null);

	useEffect(() => {
		// console.log(canvasRef.current);
		canvasState.setCanvas(canvasRef.current);
		toolState.setTool(new BrushTool(canvasRef.current));
	}, []);

	const mouseDownHandler = () => {
		canvasState.pushToUndo(canvasRef.current?.toDataURL());
	};

	return (
		<div className={cls.Canvas}>
			<canvas onMouseDown={mouseDownHandler} style={{ zoom: '100%' }} ref={canvasRef} height={480} width={840} />
		</div>
	);
});
