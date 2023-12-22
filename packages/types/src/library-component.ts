import { LibraryPanelTabEnum } from "./panel";

export type LibraryComponentInstanceProps = Record<string, signalProp>;

export type DefineComponent = () => JSX.Element;

export type TabName = "form" | "show" | "container";

export type tickType = "container" | "generics";

export interface ExportJson {
  componentData: LibraryComponent;
  props: LibraryComponentInstanceProps;
  events: (() => void)[];
}

export interface Module {
  default: ExportJson;
}

export interface LibraryComponent {
  name: string;

  libraryName: LibraryPanelTabEnum;

  tickType: string;

  tabName: string;

  order: number;

  libraryPanelShowDetail: {
    title: string;
    content: string;
  };

  tips: {
    title: string;

    content: string;

    preview?: DefineComponent;
  };
  child?: string;
}

/**
 * 物料组件定义（可视区域与右侧控制台）
 */
export interface LibraryComponentInstanceData {
  uuid: string;

  focus: boolean;

  libraryName: LibraryPanelTabEnum;

  componentName: string;

  children: LibraryComponentInstanceData[];

  props?: LibraryComponentInstanceProps;

  child?: string;
}

export interface signalProp {
  defaultValue: string;
  control: string;
  type: string;
  title?: string;
  options?: unknown;
}

export interface contentJsonProp {}
