import React from 'react';
import {Component, ComponentConfigType, FormElement, ItemType} from '@/types/schema';
import {message} from 'antd';
import {updateVariableData} from '@/store/features/variableSlice';
import MessageSetting from '../FlowEvent/SettingPanel/Action/Message';
import MethodSetting from '../FlowEvent/SettingPanel/Action/Method';
import {getComponentRef} from '@/store/componentRef';
import {useDispatch} from 'react-redux';

// 控制台 属性设置
export const componentSettingMap = {
    [ItemType.Button]: [
        {
            name: 'type',
            label: '按钮类型',
            type: 'Select',
            options: [{label: '主按钮', value: 'primary'}, {label: '次按钮', value: 'default'}],
        },
        {
            name: 'width',
            label: '宽度',
            type: 'input',
        },
        {
            name: 'height',
            label: '高度',
            type: 'input',
        },
        {
            name: 'text',
            label: '文本',
            type: 'Input',
        }
    ],
    [ItemType.Space]: [
        {
            name: 'size',
            label: '间距大小',
            type: 'Select',
            options: [
                {label: '大', value: 'large'},
                {label: '中', value: 'middle'},
                {label: '小', value: 'small'},
            ],
        },
    ],
    [ItemType.Select]: [
        {
            name: 'width',
            label: '宽度',
            type: 'input',
        },
        {
            name: 'height',
            label: '高度',
            type: 'input',
        },
        {
            name: 'text',
            label: '文本',
            type: 'Input',
        }
    ]
};

// 动态渲染表单元素
export const renderFormElement = (setting : any) => {
    const {type, options} = setting;
    const Node = FormElement[type];
    if (options){
        return <Node options={options}/>;
    }
    return <Node/>;
};

// 控制台 事件设置
export const componentEventMap = {
    [ItemType.Button]:[{
        name:'onClick',
        label: '点击事件',
    }]
};

export const actionMap: any = {
    ShowMessage: MessageSetting,
    ComponentMethod: MethodSetting,
    // SetVariable: SetVariableSetting,
    // ExecScript: ExecScriptSetting,
    // AsyncTask: AsyncTaskSetting,
};
  

// 编辑模式时 事件的数据结构
export const eventJson = {
    id: 1,
    name: 'Button',
    props: {
        // 点击事件绑定显示消息动作
        onClick: {
        // 动作类型
            type: 'ShowMessage',
            // 动作配置
            config: {
                // 消息类型
                type: 'success',  
                // 消息文本
                text: '点击了按钮',
            }
        }
    }
};

// 预览模式时 事件的数据结构
export const eventFunction = {
    id: 1,
    name: 'Button',
    props: {
        // 点击事件显示消息
        onClick: () => {
            message.success('点击了按钮');
        }
    }
};

const execScript = (script: string) => {
    // 将 script 作为函数体 创建一个函数 并注入 tool
    const func = new Function('tool', script);
    // 把常用的方法注入到tool中，可以在脚本里调用我们注入的方法
    // 比如设置变量值方法，和调用某个组件方法等
    let variable , value;
    const tool = {variable , value, getComponentRef};
    try {
        const dispatch = useDispatch();
        func(tool);
        dispatch(updateVariableData({variable, value}));
    } catch (error) {
        message.error('script error');
        console.log(error);
    }
};

// 渲染时处理事件 将事件信息由 json 格式 转化为 箭头函数的形式 可以被执行
export const handleEvent: any = (component: Component,componentConfig: ComponentConfigType) => {
    const props: any = {};
    const events = componentConfig[component.name]?.events;
    if (events?.length) {
        (events || []).forEach((event) => {
            // 事件类型： 点击事件、搜索事件
            const eventConfig = component.props[event.name];
            if (eventConfig){
                // 事件种类：设置变量、设置脚本、等
                const {type,config} = eventConfig;
                // 将事件 由 json 配置 变成 () => {message.success(config.text)} 函数的形式
                props[event.name] = () =>{
                    if (type === 'showMessage'){
                        if (config?.type === 'success'){
                            message.success(config?.text);
                        }
                        else if (config?.type === 'error'){
                            message.error(config?.text);
                        }
                    } else if (type === 'componentFunction'){
                        const component = getComponentRef(config.componentId);
                        if (component){
                            component[config.method]?.();
                        }
                    } else if (type === 'setVariable'){
                        const {variable, value} = config;
                        if(variable && value) {
                            updateVariableData({variable, value});
                        }
                    } else if (type === 'execScript'){
                        execScript(config.script);
                    }
                };
            }
        });
    }
    return props;
};

// 配置组件类型暴露出哪些方法
export const componentMethodsMap = {
    [ItemType.Button]:[{
        name:'startLoading',
        label: '开始Loading'
    },{
        name:'endLoading',
        label:'结束Loading'
    }],
};

// 编辑模式下 绑定变量 显示变量名
export const formatEditProps = (component:Component) => {
    const props = Object.keys(component.props || {}).reduce<any>(
        (prev,cur) =>{
            if (typeof component.props[cur] === 'object') {
                if (component.props[cur]?.type === 'static'){
                    prev[cur] = component.props[cur].value;
                }
                else if (component.props[cur]?.type === 'variable'){
                    const variableName = component.props[cur].value;
                    prev[cur] = `\${${variableName}}`;
                }
            }
            else {
                prev[cur] = component.props[cur];
            }
            return prev;
        },{});
    return props;
};

export const EventActionTypesDesc: any = {
    ShowMessage: '显示消息',
    ComponentMethod: '组件方法',
    SetVariable: '设置变量',
    ExecScript: '执行脚本',
    Request: '请求接口',
    Confirm: '显示确认框',
};

export function getTreeDepth(node: any) {
    if (!node) {
        return 0; // 如果节点为空，深度为0
    }
    let maxChildDepth = 0; // 当前节点的子节点的最大深度
    
    // 遍历当前节点的所有子节点，递归调用 getTreeDepth 函数获取子节点的深度
    for (const child of node.children || []) {
        const childDepth = getTreeDepth(child);
        if (childDepth > maxChildDepth) {
            maxChildDepth = childDepth;
        }
    }
    return maxChildDepth + 1; // 当前节点的深度为子节点的最大深度加1
}
  