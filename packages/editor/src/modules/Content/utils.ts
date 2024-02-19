import {Component, ComponentConfigType, Variable} from '@/types/schema';
import React from 'react';
import {formatEditProps} from '../Control/utils';

// 递归渲染组件
export function renderComponents(components: Component[], componentConfig: ComponentConfigType,variables: Variable[]) {
    return components.map((component: Component) => {
        if (!componentConfig?.[component.name]?.dev){
            return null;
        }
        // 组件绑定变量
        const props = formatEditProps(component);
        // 渲染组件
        const node : any = React.createElement(
            componentConfig[component.name]?.dev, 
            {
                key: component.id, 
                _id: component.id,
                _name: component.name,
                // 添加 唯一自定义 key 作为 被选中的组件 的唯一标识
                'data-component-key': component.id,
                ...component.props,
                ...props,
            },
            // 递归渲染
            component?.props?.children || renderComponents(component?.children || [], componentConfig, variables));
        return node;
    });
}

// 根据 id 查找组件
export function getComponentById(componentId: number, components: Component[]): Component | null {
    for(const component of components){
        if (component.id == componentId) return component;
        if (component.children && component.children.length > 0) {
            const result = getComponentById(componentId, component.children);
            if (result !== null ) return result;
        }
    }
    return null;
}
