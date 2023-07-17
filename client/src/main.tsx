import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Router} from './Components/Router/Router.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Router/>
    </BrowserRouter>
);
