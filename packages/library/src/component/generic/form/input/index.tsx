const componentData = {
  name: "Input",
  tickType: "generics",
  tabName: "form",
  libraryPanelShowDetail: {
    title: "文本框",
    content: "请输入你的文字",
  },
  // hover时出现
  tip: {
    title: "文本框",
    content: "文本输入框",
  },
};

const props = {
  title: {
    title: "文本内容",
    defaultValue: "",
    type: "Input",
    control: "value",
  },
  inputSize: {
    title: "大小",
    defaultValue: "large",
    options: [
      { label: "大", value: "large" },
      { label: "中", value: "middle" },
      { label: "小", value: "small" },
    ],
    type: "Select",
    control: "size",
  },
  inputPlaceholder: {
    title: "占位符",
    defaultValue: "Please input content!",
    type: "Input",
    control: "placeholder",
  },
};

const inputJson = {
  componentData,
  props,
};

export default inputJson;
