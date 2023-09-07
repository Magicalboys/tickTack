// import { createLibraryComponentPropItem } from "../../../../utils/library";
// import { defineLibraryComponent } from "../../../../utils/library";

// enum EventTriggersEnum {
//   click = "click",
//   doubleClick = "doubleClick",
// }
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
  // child: "按钮",
  // child?: '按钮',
  // eventTriggers: {
  //   [EventTriggersEnum.click]: {
  //     title: "click",
  //   },
  //   [EventTriggersEnum.doubleClick]: {
  //     title: "doubleClick",
  //   },
  // },
};

// 右侧的属性
const props = {
  title: {
    title: "按钮名称",
    defaultValue: "按钮",
    type: "string",
    control: "value",
  },
  buttonType: {
    title: "按钮类型",
    defaultValue: "default",
    options: [
      { title: "default", value: "default" },
      { title: "primary", value: "primary" },
      { title: "dashed", value: "dashed" },
      { title: "text", value: "text" },
      { title: "link", value: "link" },
    ],
    type: "select",
    control: "type",
  },
  buttonSize: {
    title: "按钮大小",
    defaultValue: "middle",
    options: [
      { title: "large", value: "large" },
      { title: "middle", value: "middle" },
      { title: "small", value: "small" },
    ],
    type: "select",
    control: "size",
  },
  // toRouter: {
  //   value: "",
  //   default: "",
  // },
  // toUrl: {
  //   value: "",
  //   default: "",
  // },
};

const buttonJson = {
  componentData,
  props,
};

// const tickCss = () => {
//   const tackCss = [];
//   for (const item in props) {
//     tackCss.push(props[item]?.[0]);
//   }
//   return tackCss;
// };

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
export default buttonJson;
