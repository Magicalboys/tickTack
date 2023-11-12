import {configureStore} from '@reduxjs/toolkit';
import editorSlice from './features/editorSlice';
import variableSlice from './features/variableSlice';
import configSlice from './features/configSlice';

export interface Store {
    editorSlice: any,
    variableSlice: any,
    configSlice: any
}

const store = configureStore<Store>({
    reducer: {
        editorSlice: editorSlice,
        variableSlice: variableSlice,
        configSlice: configSlice
    },
});

export default store;

