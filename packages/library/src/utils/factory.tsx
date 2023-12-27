import React from "react";
import * as Antd from "antd";
import { UIInstance } from "@tickTack/types/src/library-component";

/**
 * 遍历antd，生成组件实例
 */
const component = Object.keys(Antd);

const instanceMap = new Map<string, React.FC>();

// 注册组件
export const registerMap = (type: string, instance: React.FC) => {
  if (!instanceMap.has(type)) {
    instanceMap.set(type, instance);
  } else {
    throw new Error('您已注册过该组件');
  }
}

// 注册antd组件
const createAntdComponent = (componentName: string) => {
  if (!componentName || !Antd[componentName]) return null;
  if (instanceMap.has(componentName)) return;
  return instanceMap.set(componentName, Antd[componentName]);
};

// 遍历antd，注册所有antd组件
const allAntdInstance = (component: string[]) => {
  for (const name of component) {
    createAntdComponent(name);
  }
};

// 创建容器
const createContainer = (component: UIInstance["component"]) => {
  const { type, props, children } = component;

  if (!children || !children.length) return null;

  const childrElements = children.map((child) => {
    if (child.component.componentType === "generics") {
      return genericIns(child.component);
    } else {
      return createContainer(child.component);
    }
  });

  console.log(childrElements,type, props, 'childrElements');
  return React.createElement(type, props, ...childrElements);
};

// 创建组件
const genericIns = (component: UIInstance["component"]) => {
  let signalIns: React.FC;

  if (component.componentType === "generics") {
    signalIns = instanceMap.get(component.type);
    if (!signalIns) return null;
    return React.createElement(signalIns, component.props, component.child);
  }

  if (component.componentType === "container") {
    return createContainer(component);
  }
};

// 创建实例
const createInstanceRoot = (options: UIInstance) => {
  const component = options.component;

  return (
    <>
      {genericIns(component)}
    </>
  );
};

// reder的时候自动注册antd，这个逻辑不是很对，应该要在后续稍微更改一下
export const render = (options: UIInstance) => {
  allAntdInstance(component);
  const root = createInstanceRoot(options);
  return <>{root}</>;
};
