export interface BaseData {
  component: {
    type: string;
    props?: UIInstanceProps;
  };
}

export type UIInstanceProps = Record<string, unknown>;

export type ControlInstanceProps = Record<string, ControlInstance>;

export type componentType = "container" | "generics";

export interface signalComponent {
  ComponentInstance: UIInstance;
  ComponentControlInstance: ControlInstanceProps;
}

/**
 * 物料组件定义（可视区域的组件实例
 */
export interface UIInstance {
  component: {
    uuid?: string;

    type: string;

    focus?: boolean;

    componentType: componentType;

    children?: UIInstance[];

    props?: UIInstanceProps;

    child?: string;

    event?: EventProps[];
  };
}

/**
 * 控制台区域的组件属性
 */

export interface ControlInstance {
  component: {
    type: string;
    label: string;
    componentType: componentType;
    control: string;
    props?: Record<string, unknown>;
  };
}

/**
 * 事件配置的属性
 */
export interface EventProps {
  [key: string]: {
    type: SelectProps;
    config: Record<string, unknown>;
  };
}

/**
 * 事件参数配置
 */
export interface EventArg {
  target?: UIInstance,
  args?: Record<string, unknown>,
}

/**
 * 全局事件名称配置
 */
export type SelectProps = "componentFun" | "message" | 'console';
