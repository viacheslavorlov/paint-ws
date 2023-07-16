import {ChangeEvent, memo, useContext} from 'react';
import {ColorsContext} from '../../Context/Context.js';
import toolState from '../../store/toolState.ts';
import cls from './SettingsBar.module.css';

interface SettingsBarProps {
	className?: string;
}

export const SettingsBar = memo((props: SettingsBarProps) => {
	const { className } = props;
    const colors = useContext(ColorsContext);

    const onHandleLineWith = (e: ChangeEvent<HTMLInputElement>) => {
		toolState.setLineWidth(Number(e.target.value));
	};

	const onHandleLineColor = (e: ChangeEvent<HTMLInputElement>) => {
		toolState.setStrokeColor(String(e.target.value));
        if ('setStroke' in colors) {
            colors.setStroke(String(e.target.value));
        }
	};

    const setColor = (e: ChangeEvent<HTMLInputElement>) => {
        toolState.setFillColor(String(e.target.value));
        if ('setFill' in colors) {
            colors.setFill(String(e.target.value));
        }
    };

	return (
		<div className={cls.SettingsBar + ' ' + className}>
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
            <label className={cls.inputWithLabel} htmlFor="line-width">
                Цвет заливки:
            </label>
            <input title={'Выберите цвет заливки'} type="color" className={cls.inputWith} onChange={setColor} />

        </div>
	);
});
