import {handleEvent} from '@/modules/Control/utils';
import {Component, ComponentConfigType, Variable} from '@/types/schema';
import React from 'react';
export function renderComponents(components: Component[],componentConfig: ComponentConfigType,variables: Variable[],variableData:any ,componentRefs:any) {
    return components.map((component: Component) => {
        if (!componentConfig[component.name]?.prod){
            return null;
        }
        
        let props = formatPreviewProps(component, variables, variableData);

        props = {...props, ...handleEvent(component,componentConfig,componentRefs)};

        if(componentConfig[component.name]?.prod){
            const node : any = React.createElement(
                componentConfig[component.name]?.prod, 
                {
                    key: component.id, 
                    id: component.id,
                    // 动态渲染组件时，注入ref属性，拿到组件实例。
                    ref: (ref) => componentRefs.current[component.id] = ref,
                    ...component.props,
                    ...props,
                },
                component?.props?.children || renderComponents(component?.children || [], componentConfig,variables, variableData,componentRefs));
            return node;
        }
        return null;
    });
}

// 预览模式下 绑定变量 显示变量值
export const formatPreviewProps = (component:Component, variables: Variable[], variableData: any) => {
    const props = Object.keys(component.props || {})
        .reduce<any>((prev,cur) =>{
            if (typeof component.props[cur] === 'object') {
                if (component.props[cur]?.type === 'static'){
                    prev[cur] = component.props[cur].value;
                }
                else if (component.props[cur]?.type === 'variable'){
                    const variableName = component.props[cur].value;
                    const variable = variables.find((item) => item.name === variableName);
                    // 如果已经设置了变量 就用设置的值 如何没有就用默认值
                    prev[cur] = variableData[variableName] || variable?.defaultValue;
                }
            }
            else {
                prev[cur] = component.props[cur];
            }
            return prev;
        },{});
    return props;
};