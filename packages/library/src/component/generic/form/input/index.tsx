// import { Input } from "antd";
// import {
//   defineLibraryComponent,
//   createLibraryComponentPropItem,
// } from "../../../../utils/library";
// import { LibraryPanelTabEnum } from "../../../../../../types/src/panel";

// const inputTip = () => {
//   return (
//     <>
//       <Input placeholder='hello'></Input>
//     </>
//   );
// };
const componentData = {
  name: "Input",
  tickType: "generics",
  // libraryName: LibraryPanelTabEnum.generics,
  tabName: "form",
  // order: 1,
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
  name: {
    title: "字段名",
    belongToPanel: "generics",
    formType: "input",
    type: "string", // type主要用于以什么格式进行显示，如果是String就是输入框
    default: "text",
  },
  title: {
    title: "标题",
    belongToPanel: "generic",
    formType: "input",
    type: "string",
    default: "文本",
  },
  type: {
    title: "类型",
    belongToPanel: "generic",
    formType: "select",
    selectOptions: [
      { title: "文本", value: "text" },
      { title: "密码", value: "password" },
      { title: "数字", value: "number" },
      { title: "手机号", value: "tel" },
      { title: "整数", value: "digit" },
    ],
    type: "string",
    default: "text",
  },
  value: {
    title: "默认值",
    belongToPanel: "generic",
    formType: "input",
    type: "string",
    default: "",
  },
  placeholder: {
    title: "占位符",
    belongToPanel: "generic",
    formType: "input",
    type: "string",
    default: "Please input content!",
  },
  // widgetCss: {
  //   title: "控件样式",
  //   default: {},
  //   formType: "cssPropertyInput",
  //   belongToPanel: "appearance",
  // },
};

const inputJson = {
  componentData,
  props,
};

export default inputJson;
