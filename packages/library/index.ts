import {
  LibraryComponentInstanceProps,
  ExportJson,
} from "../types/src/library-component";
import {
  // LibraryComponent,
  Module,
  // LibraryComponentInstanceData,
} from "../types/src/library-component";
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const libraryPropsMap: Record<string, LibraryComponentInstanceProps> = {};
// const libraryTree: Record<string, Record<string, LibraryComponent[]>> = {};
// const libraryRecord: Record<string, LibraryComponent[]> = {};
const libraryMap: Record<string, ExportJson> = {};

/**
 * 添加每一个组件的props
 */
Object.entries(libraryComponents).forEach(([, module]) => {
  const name = module.default.componentData.name;
  libraryPropsMap[name] = module.default.props;
});

// 导出每一个组件的数据
Object.entries(libraryComponents).forEach(([url, module]) => {
  libraryMap[module.default.componentData.name] = module.default;
});

// // 再分类每个lib下面的组件到lib->tab
// Object.entries(libraryRecord).forEach(([libraryName, modules]) => {
//   if (!libraryTree[libraryName]) libraryTree[libraryName] = {};
//   modules.forEach((module) => {
//     if (!libraryTree[libraryName][module.tabName])
//       libraryTree[libraryName][module.tabName] = [];
//     libraryTree[libraryName][module.tabName].push(module);
//   });
// });

// 排序每个tab中的物料顺序
// Object.entries(libraryTree).forEach(([, modules]) => {
//   Object.entries(modules).forEach(([, module]) => {
//     module.sort((a, b) => a.order - b.order);
//   });
// });

// function getLibraryModules(libraryName) {
//   return libraryTree[libraryName] ?? {};
// }

export {
  // libraryRecord,
  libraryMap,
  // getLibraryModules,
  libraryComponents,
  libraryPropsMap,
  libraryAsideMenu
};
// export default libraryTree;
