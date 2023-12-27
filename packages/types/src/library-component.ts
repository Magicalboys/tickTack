// import { LibraryPanelTabEnum } from "./panel";

export interface BaseData {
  component: {
    type: string;
    props?: UIInstanceProps;
  }
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
    control: string,
    props?: Record<string, unknown>
  }
}
