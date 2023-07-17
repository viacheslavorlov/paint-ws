import {Route, Routes} from 'react-router-dom';
import App from '../App/App.js';
import {RedirectionPage} from '../RedirectionPage/RedirectionPage.js';


export const Router = () => {
    return (
        <Routes>
            <Route path={'/'} element={<RedirectionPage/>}/>
            <Route
                path={'/:id'}
                element={<App/>}
            />
            <Route path="*" element={<RedirectionPage/>}/>
        </Routes>
    );
};
