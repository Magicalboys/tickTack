import {
  ControlInstanceProps,
  signalComponent,
} from "../types/src/library-component";

/**
 * 动态导入模块
 */
interface AllPropsInter {
  default: signalComponent;
}
const allInstanceProp: AllPropsInter[] = import.meta.glob(
  "./src/component/**/index.(tsx|jsx)",
  {
    eager: true,
  }
);

// 全局json的map实例
const instanceMap = new Map<string, signalComponent>();
// 全局json
const instanceControlMap = new Map<string, ControlInstanceProps>();

Object.entries(allInstanceProp).forEach(([, module]) => {
  const type = module.default.ComponentInstance.component.type;
  instanceMap.set(type, module.default);
  instanceControlMap.set(type, module.default.ComponentControlInstance);
});

export { instanceControlMap, instanceMap };
