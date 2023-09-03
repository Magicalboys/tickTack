import { Button } from "antd";
import { createLibraryComponentPropItem } from "../../../../utils/library";
import { defineLibraryComponent } from "../../../../utils/library";

// const App: React.FC = () => {
enum EventTriggersEnum {
  click = "click",
  doubleClick = "doubleClick",
}

const buttonTip = () => {
  return (
    <>
      <Button>hello world</Button>
    </>
  );
};
const componentData = defineLibraryComponent({
  name: "tickButton",
  tickType: "generics",
  tabName: "form",
  order: 2,
  libraryPanelShowDetail: {
    title: "按钮",
    content: buttonTip,
  },
  tips: {
    title: "按钮",
    content: "按一下就知道啦",
  },
  eventTriggers: {
    [EventTriggersEnum.click]: {
      title: "click",
    },
    [EventTriggersEnum.doubleClick]: {
      title: "doubleClick",
    },
  },
});
// 右侧的属性
const props = {
  title: createLibraryComponentPropItem({
    title: "按钮名称",
    default: "按钮",
  }),
  buttonType: createLibraryComponentPropItem({
    title: "按钮类型",
    default: "default",
    selectOptions: [
      { title: "default", value: "default" },
      { title: "primary", value: "primary" },
      { title: "success", value: "success" },
      { title: "info", value: "info" },
      { title: "warning", value: "warning" },
      { title: "danger", value: "danger" },
    ],
    type: String,
  }),
  buttonSize: createLibraryComponentPropItem({
    title: "按钮大小",
    default: "normal",
    selectOptions: [
      { title: "large", value: "large" },
      { title: "normal", value: "normal" },
      { title: "small", value: "small" },
      { title: "mimi", value: "mimi" },
    ],
    type: String,
  }),
};

const tickCss = () => {
  const tackCss = [];
  for (const item in props) {
    tackCss.push(props[item]?.[0]);
  }
  return tackCss;
};

//   return (
//     <>
//       <div className={tickCss().join("")}>
//         <Button type={props.buttonType} size={props.buttonSize}>
//           {props.title}
//         </Button>
//       </div>
//     </>
//   );
// };
export default componentData;
