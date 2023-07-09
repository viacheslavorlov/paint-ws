import {memo} from 'react';
import cls from './SettingsBar.module.css';

interface SettingsBarProps {
    className?: string;
}

export const SettingsBar = memo((props: SettingsBarProps) => {
    const {
        className
    } = props;

    return (
        <div className={cls.SettingsBar}>

        </div>
    );
});
