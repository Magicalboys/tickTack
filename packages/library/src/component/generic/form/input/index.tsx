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
    title: "标题",
    defaultValue: "",
    type: "string",
    control: "value",
  },
  inputSize: {
    title: "大小",
    defaultValue: "middle",
    options: [
      { title: "large", value: "large" },
      { title: "middle", value: "middle" },
      { title: "small", value: "small" },
    ],
    type: "select",
    control: "size",
  },
  inputPlaceholder: {
    title: "占位符",
    defaultValue: "Please input content!",
    type: "string",
    control: "placeholder",
  },
};

const inputJson = {
  componentData,
  props,
};

export default inputJson;
