import {
  LibraryComponentInstanceProps,
  ExportJson,
} from "../types/src/library-component";
import { Module } from "../types/src/library-component";
import { asideMenu as libraryAsideMenu } from "./src/universal";

/**
 * 动态导入模块
 */
const libraryComponents = import.meta.glob<Module>(
  "./src/component/**/index.(tsx|jsx)",
  {
    eager: true,
  }
);
const libraryPropsMap: Record<string, LibraryComponentInstanceProps> = {};
const libraryMap: Record<string, ExportJson> = {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const libraryEvent = {};

/**
 * 添加每一个组件的props
 */
Object.entries(libraryComponents).forEach(([, module]) => {
  const name = module.default.componentData.name;
  libraryPropsMap[name] = module.default.props;
});

// 导出每一个组件的数据
Object.entries(libraryComponents).forEach(([, module]) => {
  libraryMap[module.default.componentData.name] = module.default;
});

/**
 * 导出每一个组件的事件
 */
Object.entries(libraryComponents).forEach(([, module]) => {
  if (module.default.componentData.name === "Button") {
    module.default.events.forEach((eventEmit) => {
      eventEmit();
    });
    console.log(module.default.events);
    libraryEvent[module.default.componentData.name] = module.default.events;
  }
});

export {
  libraryMap,
  libraryComponents,
  libraryPropsMap,
  libraryAsideMenu,
  libraryEvent,
};
