import { ChangeEvent, memo } from 'react';
import toolState from '../../store/toolState';
import cls from './SettingsBar.module.css';

interface SettingsBarProps {
	className?: string;
}

export const SettingsBar = memo((props: SettingsBarProps) => {
	const { className } = props;
	const onHandleLineWith = (e: ChangeEvent<HTMLInputElement>) => {
		toolState.setLineWidth(Number(e.target.value));
	};

	const onHandleLineColor = (e: ChangeEvent<HTMLInputElement>) => {
		toolState.setStrokeColor(e.target.value);
	};

	return (
		<div className={cls.SettingsBar}>
			<label className={cls.inputWithLabel} htmlFor="line-width">
				Толщина линии:
			</label>
			<input
				id="line-width"
				className={cls.inputWith}
				type="number"
				defaultValue={1}
				min={1}
				max={100}
				onChange={onHandleLineWith}
			/>
			<label className={cls.inputWithLabel} htmlFor="line-width">
				Цвет линии:
			</label>
			<input id="line-width" className={cls.inputWith} type="color" onChange={onHandleLineColor} />
		</div>
	);
});
