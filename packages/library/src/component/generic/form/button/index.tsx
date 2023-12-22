import globalEventEmitter from "../../../../../../event-action/src/index";
const componentData = {
  name: "Button",
  tickType: "generics",
  tabName: "form",
  order: 2,
  libraryPanelShowDetail: {
    title: "按钮",
    content: "按下去",
  },
  tips: {
    title: "按钮",
    content: "按一下就知道啦",
  },
};

// 右侧的属性
const props = {
  title: {
    title: "按钮名称",
    defaultValue: "按钮",
    type: "Input",
    control: "value",
  },
  buttonType: {
    title: "按钮类型",
    defaultValue: "primary",
    options: [
      { label: "默认", value: "default" },
      { label: "主色调", value: "primary" },
      { label: "虚线边框", value: "dashed" },
      { label: "纯文本", value: "text" },
      { label: "链接", value: "link" },
    ],
    type: "Select",
    control: "type",
  },
  buttonSize: {
    title: "按钮大小",
    defaultValue: "middle",
    options: [
      { label: "大", value: "large" },
      { label: "中", value: "middle" },
      { label: "小", value: "small" },
    ],
    type: "Select",
    control: "size",
  },
};

const onClick = () => {
  alert("111");
};
// const
const buttonJson = {
  componentData,
  props,
  events: [
    () => {
      globalEventEmitter.subscribe(componentData.name, onClick);
      // globalEventEmitter.emit(componentData.name);
    },
  ],
};

export default buttonJson;
