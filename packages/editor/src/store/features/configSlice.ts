import {ComponentConfig} from '@/types/schema';
import {createSlice} from '@reduxjs/toolkit';

export interface InitialState {
    componentConfig: {[key: string]: ComponentConfig};
}

const initialState: InitialState = {
    componentConfig: {},
};

export const configSlice = createSlice({
    // 命名空间，在调用action的时候会默认的设置为action的前缀
    name: 'config',
    
    // 初始状态
    initialState,
    
    // 状态改变
    reducers: {
        // 添加变量
        setComponentConfig(state, action){
            const componentConfig = action.payload;
            state.componentConfig = componentConfig;
        }
    },
}
);

// 导出 action
export const {
    setComponentConfig,
} = configSlice.actions;

// 导出 state
export const useConfigState = (state:any) => state.configSlice;


// 默认导出
export default configSlice.reducer;
