import {Canvas} from '../Canvas/Canvas';
import {SettingsBar} from '../SettingsBar/SettingsBar';
import {Toolbar} from '../Toolbar/Toolbar';
import cls from './App.module.css';

function App() {

    return (
        <div className={cls.app}>
            <Toolbar/>
            <SettingsBar/>
            <Canvas/>
        </div>
    );
}

export default App;
