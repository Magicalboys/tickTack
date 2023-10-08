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

export { libraryMap, libraryComponents, libraryPropsMap, libraryAsideMenu };
