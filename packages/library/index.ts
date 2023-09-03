import { LibraryComponent } from "../types/src/library-component";

/**
 * 动态导入模块
 */
const libraryComponents = import.meta.glob<LibraryComponent>(
  "./src/component/**/index.(tsx|jsx)",
  {
    eager: true,
  }
);
const libraryTree: Record<string, Record<string, LibraryComponent[]>> = {};
const libraryRecord: Record<string, LibraryComponent[]> = {};
const libraryMap: Record<string, LibraryComponent> = {};

// 添加每一个lib下面的组件
Object.entries(libraryComponents).forEach(([url, module]) => {
  console.log(typeof libraryComponents, "libraryComponent");
  console.log(url, "url");
  console.log(module, "moudle");
  module = module?.default || module;
  if (!libraryRecord[module.libraryName])
    libraryRecord[module.libraryName] = [];
  libraryRecord[module.libraryName].push(module);
  libraryMap[module.name] = module;
});

// 再分类每个lib下面的组件到lib->tab
Object.entries(libraryRecord).forEach(([libraryName, modules]) => {
  if (!libraryTree[libraryName]) libraryTree[libraryName] = {};
  modules.forEach((module) => {
    if (!libraryTree[libraryName][module.tabName])
      libraryTree[libraryName][module.tabName] = [];
    libraryTree[libraryName][module.tabName].push(module);
  });
});

// 排序每个tab中的物料顺序
Object.entries(libraryTree).forEach(([, modules]) => {
  Object.entries(modules).forEach(([, module]) => {
    module.sort((a, b) => a.order - b.order);
  });
});

function getLibraryModules(libraryName) {
  return libraryTree[libraryName] ?? {};
}

export { libraryRecord, libraryMap, getLibraryModules, libraryComponents };
export default libraryTree;
