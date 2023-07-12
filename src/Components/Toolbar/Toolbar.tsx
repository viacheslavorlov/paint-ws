import Brush from '/src/assets/menu-svg/brush.svg';
import { ChangeEvent, useState } from 'react';
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
import CircleTool from '../../tools/CircleTool';
import EraserTool from '../../tools/EraizerTool';
import LineTool from '../../tools/LineTool';
import RectangleTool from '../../tools/RectangleTool';
import cls from './Toolbar.module.css';

export const Toolbar = () => {
	const [colorState, setColorState] = useState<string>('#000000');
	const setColor = (e: ChangeEvent<HTMLInputElement>) => {
		toolState.setFillColor(e.target.value);
		setColorState(e.target.value);
	};

	const setBrush = () => {
		toolState.setTool(new BrushTool(canvasState.canvas));
		toolState.setStrokeColor(colorState);
	};

	const setRect = () => {
		toolState.setTool(new RectangleTool(canvasState.canvas));
		toolState.setStrokeColor(colorState);
	};

	const setCircle = () => {
		toolState.setTool(new CircleTool(canvasState.canvas));
	};

	const setEraser = () => {
		toolState.setTool(new EraserTool(canvasState.canvas));
	};

	const setLine = () => {
		toolState.setTool(new LineTool(canvasState.canvas));
		toolState.setStrokeColor(colorState);
	};

	const undo = () => {
		canvasState.undo();
	};

	const redo = () => {
		canvasState.redo();
	};

	return (
		<div className={cls.Toolbar}>
			<div className={cls.tools}>
				<button id="brush" className={cls.btn} onClick={setBrush}>
					<Brush />
				</button>
				<button id="rectangle" className={cls.btn} onClick={setRect}>
					<Rectangle />
				</button>
				<button id="circle" className={cls.btn} onClick={setCircle}>
					<Circle />
				</button>
				<button id="eraser" className={cls.btn} onClick={setEraser}>
					<Eraser />
				</button>
				<button id="line" className={cls.btn} onClick={setLine}>
					<Line />
				</button>
				<input title={'Выберите цвет заливки'} type="color" className={cls.colorBg} onChange={setColor} />
			</div>
			<div className={cls.tools}>
				<button onClick={undo} title={'Отменить'} id="undo" className={cls.btn}>
					<Undo />
				</button>
				<button onClick={redo} title={'Повторить'} id="redo" className={cls.btn}>
					<Redo />
				</button>
				<button title={'Сохранить'} id="save" className={cls.btn}>
					<Save />
				</button>
			</div>
		</div>
	);
};
