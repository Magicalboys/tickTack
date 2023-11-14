import {getComponentById} from '@/modules/Content/utils';
import {Component} from '@/types/schema';
import {createSlice} from '@reduxjs/toolkit';

export interface InitialState {
    // 组件树
    componentTree: Component[],

    // 当前选中的组件的id
    selectedComponentId?: number,

    // 当前选中的组件
    selectedComponent: Component | null,

    // 当前的模式： 编辑 or 预览
    mode: 'edit' | 'preview',
}

const initialState: InitialState = {
    componentTree: [],
    selectedComponentId: undefined,
    selectedComponent: null,
    mode: 'edit'
};

export const editorSlice = createSlice({
    // 命名空间，在调用action的时候会默认的设置为action的前缀
    name: 'editor',
    
    // 初始状态
    initialState,
    
    // 状态改变
    reducers: {
        // 更新组件树
        updateComponentsTree(state , action) {
            const {component,id: parentId} = action.payload;
            // 如果有 父组件 id，则将 当前组件 添加到 父组件 当中
            if (parentId) {
                // 通过 父组件 id 递归查找 父组件 
                const parentComponent = getComponentById(parentId, state.componentTree);
                if (parentComponent){
                    if (parentComponent?.children) {
                        parentComponent?.children?.push(component);
                    } else {
                        parentComponent.children = [component];
                    }
                }
                state.componentTree = [...state.componentTree];
                return;
            }
            state.componentTree = [...state.componentTree ,component];

            // 添加后被选中后
            state.selectedComponentId = component.id;
            state.selectedComponent = component;
        },
    
        // 更新当前选中的组件
        setSelectedComponent(state , action) {
            const componentId = action.payload;
            state.selectedComponentId = componentId;
            state.selectedComponent = getComponentById(componentId, state.componentTree);
        },

        // 更新组件属性
        updateComponentProps(state , action) {
            const {selectedComponentId: componentId, changeValue: props,} = action.payload;
            const component = getComponentById(componentId,state.componentTree);
            if (component){
                component.props = {...component.props,...props};
                if (componentId === state.selectedComponentId) {
                    state.selectedComponentId = component.id;
                    state.selectedComponent = component;
                    state.componentTree = [...state.componentTree];
                    return;
                }
                state.componentTree = [...state.componentTree];
                return;
            }
            state.componentTree = [...state.componentTree];
            return;
        },

        // 更新当前模式 编辑 or 预览
        setMode(state, action) {
            const mode = action.payload;
            state.mode = mode;
        }


    }
});

// 导出 action
export const {
    updateComponentsTree,
    setSelectedComponent,
    updateComponentProps,
    setMode,
} = editorSlice.actions;

// 导出 state
export const useComponentState = (state:any) => state.editorSlice;
export const useComponentTree = (state:any) => state.editorSlice.componentTree;
export const useSelectedComponentId = (state:any) => state.editorSlice.selectedComponentId;

// 默认导出
export default editorSlice.reducer;
