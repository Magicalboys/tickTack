import React from "react";
import * as Antd from "antd";
import EventEmitter from "@ticktack/editor/util/eventEmitter";
import { apis } from "@ticktack/editor/src/components/apis/index";
import Block from "../../../editor/src/components/custom/block/index";
import { UIInstance } from "@tickTack/types/src/library-component";

/**
 * 遍历antd，生成组件实例
 */
const component = Object.keys(Antd);

export const instanceMap = new Map<string, React.FC>();

// 注册组件
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerMap = (type: string, instance: React.FC<any>) => {
  if (!instanceMap.has(type)) {
    instanceMap.set(type, instance);
  } else {
    throw new Error("您已注册过该组件");
  }
};

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
  const { type, props, children, uuid } = component;
  if (!children) return null;

  const childrElements = children.map((child) => {
    if (child.component.componentType === "generics") {
      return genericIns(child.component);
    } else {
      return createContainer(child.component);
    }
  });
  const signalIns = instanceMap.get(type);
  console.log(uuid, "uuid");
  return React.createElement(
    signalIns,
    {
      //@ts-expect-error 需要为每个组件在渲染的时候添加uuid
      uuid: uuid,
      ...props,
    },
    ...childrElements
  );
};

// 创建组件
const genericIns = (component: UIInstance["component"]) => {
  let signalIns: React.FC;
  const { componentType, uuid, props, type, child } = component;

  if (componentType === "generics") {
    signalIns = instanceMap.get(type);
    if (!signalIns) return null;

    if (uuid) {
      return React.createElement(
        signalIns,
        {
          ...props,
          //@ts-expect-error 需要为每个组件在渲染的时候添加uuid
          uuid: uuid,
          onClick: renderComponentAction(component['event']),
          //  () => {
            // window.message.success('点击了按钮');
            // console.log("this is click");
            // apis.useMessage({type: 'success', text: '成功'})
          // },
        },
        child
      );
    } else {
      return React.createElement(signalIns, props, child);
    }
  }

  if (component.componentType === "container") {
    return createContainer(component);
  }
};

// 创建实例
const createInstanceRoot = (options: UIInstance) => {
  const component = options.component;

  return <>{genericIns(component)}</>;
};

type RenderEventProps = { [eventName: string]: string };

const renderAction = (events: RenderEventProps) => {
  for (const key in events) {
    EventEmitter.on(key, eval(events[key]));
  }
};

// 多种事件的话可以使用策略模式进行封装
const renderComponentAction = (events: UIInstance["component"]["event"]) => {
  if (!events || events.length === 0) return;
  let handler;
  for (const event of events) {
    const name = Object.keys(event)[0];
    handler = apis.find((api) => api.name === event[name].type);
  }

  const emitEvent = () => {
    EventEmitter.emit(handler.name);
  }

  return  emitEvent;
};

// reder的时候自动注册antd，这个逻辑不是很对，应该要在后续稍微更改一下
export const render = (options: UIInstance, events?: RenderEventProps) => {
  allAntdInstance(component);
  instanceMap.set("Block", Block);
  if (events) {
    renderAction(events);
  }
  const root = createInstanceRoot(options);
  return <>{root}</>;
};
