import Brush from '/src/assets/menu-svg/brush.svg';
import { ChangeEvent } from 'react';
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
	const setColor = (e: ChangeEvent<HTMLInputElement>) => {
		toolState.setFillColor(e.target.value);
	};

	return (
		<div className={cls.Toolbar}>
			<div className={cls.tools}>
				<button
					id="brush"
					className={cls.btn}
					onClick={() => toolState.setTool(new BrushTool(canvasState.canvas))}
				>
					<Brush />
				</button>
				<button
					id="rectangle"
					className={cls.btn}
					onClick={() => toolState.setTool(new RectangleTool(canvasState.canvas))}
				>
					<Rectangle />
				</button>
				<button
					id="circle"
					className={cls.btn}
					onClick={() => toolState.setTool(new CircleTool(canvasState.canvas))}
				>
					<Circle />
				</button>
				<button
					id="eraser"
					className={cls.btn}
					onClick={() => toolState.setTool(new EraserTool(canvasState.canvas))}
				>
					<Eraser />
				</button>
				<button
					id="line"
					className={cls.btn}
					onClick={() => toolState.setTool(new LineTool(canvasState.canvas))}
				>
					<Line />
				</button>
				<input title={'Выберите цвет заливки'} type="color" className={cls.colorBg} onChange={setColor} />
			</div>
			<div className={cls.tools}>
				<button title={'Отменить'} id="undo" className={cls.btn}>
					<Undo />
				</button>
				<button title={'Повторить'} id="redo" className={cls.btn}>
					<Redo />
				</button>
				<button title={'Сохранить'} id="save" className={cls.btn}>
					<Save />
				</button>
			</div>
		</div>
	);
};
