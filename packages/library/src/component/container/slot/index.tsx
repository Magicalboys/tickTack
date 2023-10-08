const componentData = {
  name: "Slot",
  tickType: "container",
  tabName: "what",
  order: 3,
  libraryPanelShowDetail: {
    title: "插槽",
    content: "可以放置元素",
  },
  tips: {
    title: "插槽",
    content: "拖动至内容展示区s",
  },
};

// 右侧的属性
const props = {
  title: {
    title: "按钮名称",
    defaultValue: "悬浮按钮",
    type: "string",
    control: "value",
  },
};

const slotJson = {
  componentData,
  props,
};
export default slotJson;
