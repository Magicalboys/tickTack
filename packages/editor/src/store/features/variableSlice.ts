import {Variable} from '@/types/schema';
import {createSlice} from '@reduxjs/toolkit';

export interface InitialState {
    variables: Variable[],
    variableData: any,
}

const initialState: InitialState = {
    variables: [],
    // 设置 变量的值
    variableData: {},
};

export const variableSlice = createSlice({
    // 命名空间，在调用action的时候会默认的设置为action的前缀
    name: 'variable',
    
    // 初始状态
    initialState,
    
    // 状态改变
    reducers: {
        // 添加变量
        setVariables(state, action){
            const variables = action.payload;
            state.variables = variables;
        },
        // 给变量设置值
        updateVariableData(state, action){
            const {key,value} = action.payload;
            state.variableData = {... state.variableData, [key]: value};
        }
    },
}
);

// 导出 action
export const {
    setVariables,
    updateVariableData,
} = variableSlice.actions;

// 导出 state
export const useVariableState = (state:any) => state.variableSlice;


// 默认导出
export default variableSlice.reducer;
