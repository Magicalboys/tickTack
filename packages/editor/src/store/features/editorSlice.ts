import {getComponentById} from '@/modules/Content/utils';
import {Change, Component} from '@/types/schema';
import {createSlice} from '@reduxjs/toolkit';

export interface EditorSlice {
    // 组件树
    componentTree: Component[],

    // 当前选中的组件的id
    selectedComponentId?: number,

    // 当前选中的组件
    selectedComponent: Component | null,

    // 基本操作的快照数据
    changes: Change[],

    // 快照索引
    changesIndex: number,

    // 当前的模式： 编辑 or 预览
    mode: 'edit' | 'preview',
}

const initialState: EditorSlice = {
    componentTree: [
        {
            id: 1,
            name: 'Page',
            props: {},
            desc: '页面',
        },
    ],
    changes:[],
    changesIndex:-1,
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
        // 添加组件
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
                component.parentId = parentId;
                state.componentTree = [...state.componentTree];
            } else {
                state.componentTree = [...state.componentTree ,component];
            }
            // 清除未恢复的撤回操作
            state.changes.splice(state.changesIndex + 1);
            // 执行差量更新
            state.changes.push({
                type: 'ADD',
                parentId: parentId ?? -1,
                targetId: component.id,
                property: component.name, // 添加操作不需要记录属性
                previousValue: component, // 添加的组件
            });
            state.changesIndex ++;
            // 添加后被选中
            state.selectedComponentId = component.id;
            state.selectedComponent = component;
        },
    
        // 更新当前选中的组件
        setSelectedComponent(state , action) {
            const componentId = action.payload;
            state.selectedComponentId = componentId;
            state.selectedComponent = getComponentById(componentId, state.componentTree);
        },

        // 删除组件
        deleteComponent(state , action) {
            const {componentId} = action.payload;
            if (!componentId) return ;
            const component = getComponentById(componentId, state.componentTree);
            state.selectedComponentId = undefined;
            state.selectedComponent = null;
            if (component?.parentId) {
                const parentComponent = getComponentById(component?.parentId, state.componentTree);
                if (parentComponent){
                    // 删除子组件
                    parentComponent.children = parentComponent.children?.filter((item:any) => item.id !== Number(componentId));
                }
            } else {
                state.componentTree = state.componentTree.filter((item:any) => item.id !== componentId);
            }
            // 添加差量更新记录
            state.changes.splice(state.changesIndex + 1);
            state.changes.push({
                type: 'DELETE',
                parentId: component?.parentId ?? -1,
                targetId: componentId,
                property: '', // 删除操作不需要记录属性
                previousValue: component, // 记录被删除的组件对象
            });
            state.changesIndex ++;
        },

        // 更新组件属性
        updateComponentProps(state , action) {
            const {selectedComponentId: componentId, changeValue: props} = action.payload;
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

        updateAllComponentProps(state , action) {
            const {selectedComponentId: componentId, changeValue} = action.payload;
            const component = getComponentById(componentId,state.componentTree);
            if (component){
                component.props = changeValue.props;
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
        },

        // 撤销操作
        undo(state){
            if (state.changesIndex >= 0 && state.componentTree?.[0]?.children) {
                const change = state.changes[state.changesIndex];
                state.changesIndex --;
                switch (change.type) {
                case 'ADD':
                    state.componentTree[0].children = state.componentTree?.[0]?.children.filter((component) => component.id != change.targetId);
                    break;
                case 'DELETE':
                    state.componentTree[0].children.push(change.previousValue);
                    break;
                }
                state.selectedComponentId = undefined;
                state.selectedComponent = null;
            }
        },

        // 重做操作
        redo(state){
            if (state.changesIndex < state.changes.length - 1 && state.componentTree?.[0]?.children) {
                state.changesIndex ++;
                const change = state.changes[state.changesIndex];
                switch (change.type) {
                case 'ADD':
                    state.componentTree[0].children.push(change.previousValue);
                    state.selectedComponentId = change.targetId;
                    state.selectedComponent = change.previousValue;
                    break;
                case 'DELETE':
                    state.componentTree[0].children = state.componentTree[0]?.children.filter((c) => c.id !== change.targetId);
                    break;
                }
            }
        }

    }
});

// 导出 action
export const {
    updateComponentsTree,
    setSelectedComponent,
    updateComponentProps,
    updateAllComponentProps,
    deleteComponent,
    setMode,
    undo,
    redo,
} = editorSlice.actions;

// 导出 state
export const useComponentState = (state:any) => state.editorSlice;
export const useComponentTree = (state:any) => state.editorSlice.componentTree;
export const useSelectedComponentId = (state:any) => state.editorSlice.selectedComponentId;

// 默认导出
export default editorSlice.reducer;
