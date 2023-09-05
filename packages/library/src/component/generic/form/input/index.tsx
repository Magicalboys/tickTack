// import { Input } from "antd";
import {
  defineLibraryComponent,
  createLibraryComponentPropItem,
} from "../../../../utils/library";
import { LibraryPanelTabEnum } from "../../../../../../types/src/panel";

// const inputTip = () => {
//   return (
//     <>
//       <Input placeholder='hello'></Input>
//     </>
//   );
// };
const componentData = defineLibraryComponent({
  name: "tickInput",
  tickType: "generics",
  libraryName: LibraryPanelTabEnum.generics,
  tabName: "form",
  order: 1,
  libraryPanelShowDetail: {
    title: "文本框",
    content: "请输入你的文字",
  },
  tip: {
    title: "文本框",
    content: "文本输入框",
  },
});

const props = {
  name: createLibraryComponentPropItem({
    title: "字段名",
    belongToPanel: "generics",
    formType: "input",
    type: String,
    default: "text",
  }),
  title: createLibraryComponentPropItem({
    title: "标题",
    belongToPanel: "generic",
    formType: "input",
    type: String,
    default: "文本",
  }),
  type: createLibraryComponentPropItem({
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
    type: String,
    default: "text",
  }),
  value: createLibraryComponentPropItem({
    title: "默认值",
    belongToPanel: "generic",
    formType: "input",
    type: String,
    default: "",
  }),
  placeholder: createLibraryComponentPropItem({
    title: "占位符",
    belongToPanel: "generic",
    formType: "input",
    type: String,
    default: "Please input content!",
  }),
  widgetCss: createLibraryComponentPropItem({
    title: "控件样式",
    default: {},
    formType: "cssPropertyInput",
    belongToPanel: "appearance",
  }),
};

export default componentData;
export { props };
