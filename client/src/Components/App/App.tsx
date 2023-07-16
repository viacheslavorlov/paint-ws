import {useMemo, useState} from 'react';
import {ColorsContext, IColorsContext} from '../../Context/Context.js';
import {Canvas} from '../Canvas/Canvas';
import {SettingsBar} from '../SettingsBar/SettingsBar';
import {Toolbar} from '../Toolbar/Toolbar';
import cls from './App.module.css';



function App() {
    const [fill, setFill] = useState('#000000');
    const [stroke, setStroke] = useState('#000000');

    const colors: IColorsContext = useMemo(() => ({
       fill,
       stroke,
       setFill,
       setStroke
    }), [fill,setFill, setStroke, stroke]);

    return (
        <ColorsContext.Provider value={colors}>
            <div className={cls.app}>
                <Toolbar/>
                <SettingsBar/>
                <Canvas/>
            </div>
        </ColorsContext.Provider>
    );
}

export default App;
