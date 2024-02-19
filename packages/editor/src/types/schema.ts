import SettingFromInput from '@/common/SettingForm/Input';
import {Button, Input, Select, Space, message} from 'antd';

// 组件 数据结构
export interface Component {
    /**
     * 组件唯一标识
     */
    id: number;
    /**
     * 组件名称
     */
    name: string;
    /**
     * 组件属性
     */
    props: any;
    /**
     * 父组件ID
     */
    parentId?: number;
    /**
     * 子组件
     */
    children?: Component[];
    /**
     * 组件描述
     */
    desc?: string;
    hidden?: {
        type: 'static' | 'variable';
        value: any;
    };
}

// 配置信息 数据结构
export interface ComponentConfig {
    /**
     * 组件名称
     */
    name: string;
    /**
     * 组件描述
     */
    desc: string;
    /**
     * 组件默认属性
     */
    defaultProps:
      | {
          [key: string]: {
            type: 'variable' | 'static';
            value: any;
          };
        }
      | (() => {
          [key: string]: {
            type: 'variable' | 'static';
            value: any;
          };
        });
    /**
     * 编辑模式下加载的组件
     */
    dev: any;
    /**
     * 正式模式下加载的组件
     */
    prod: any;
    /**
     * 组件属性配置
     */
    setter: ComponentSetter[];
    /**
     * 组件方法
     */
    methods: ComponentMethod[];
    /**
     * 组件事件
     */
    events: ComponentEvent[];
    /**
     * 组件排序
     */
    order: number;
      /**
    * 组件是否在物料中隐藏
    */
    hiddenInMaterial?: boolean;
    /**
     * 允许放置到哪些组件上
     */
    allowDrag: string[];
}

export interface ComponentConfigState {
    componentConfig:ComponentConfig
}

export interface ComponentConfigType {
    [key: string]: ComponentConfig
}

export interface ComponentSetter {
    name: string;
    label: string;
    type: string;
    [key: string]: any;
}
  
export interface ComponentEvent {
    name: string;
    desc: string;
}
  
export interface ComponentMethod {
    name: string;
    desc: string;
}
  
interface IComponentMap {
    [key: string]: any;
}

export interface Register {
    registerComponent: (name: string, componentConfig: any) => void;
}

// 变量 数据结构
export interface Variable {
    /**
     * 变量名
     */
    name: string;
    /**
     * 默认值
     */
    defaultValue: string;
    /**
     * 备注
     */
    remark: string;
}

// 绑定变量 数据结构
export interface Value {
  // 分为静态和变量两种
  type: 'static' | 'variable';
  value: any;
}

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

// 组件列表映射
export const ComponentMap : IComponentMap = {
    'Button': Button,
    'Input': Input,
    'Space': Space,
    'Select': Select,
};

export const ItemType = {
    Button: 'Button',
    Input: 'Input',
    Space: 'Space',
    Select: 'Select',
    Table: 'Table',
    TableColumn: 'TableColumn',
    SearchForm:'SearchForm',
    SearchFormItem: 'SearchFormItem',
    Modal: 'Modal',
    Form: 'Form',
    FormItem: 'FormItem',
    Page: 'Page',
    Box: 'Box',
};

// 右侧控制台 表单
export const FormElement: IComponentMap = {
    'button': Button,
    'input': SettingFromInput,
    // 'input': Input,
    'select': Select,
    'space': Space,
};

export interface CommonComponentProps {
    _id: number;
    _name: string;
    _desc?: string;
    children?: any;
    [key: string]: any;
  }
  
