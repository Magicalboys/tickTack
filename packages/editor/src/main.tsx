import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Provider} from 'react-redux';
import store from './store/index';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode> 
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        </Provider>
    </React.StrictMode>,
);
