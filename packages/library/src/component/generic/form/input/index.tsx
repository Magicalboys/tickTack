import { Input } from "antd";
import { defineLibraryComponent } from "../../../../utils/library";
import { LibraryPanelTabEnum } from "../../../../../../types/src/panel";

const inputTip = () => {
  return (
    <>
      <Input placeholder='hello'></Input>
    </>
  );
};
const componentData = defineLibraryComponent({
  name: "tickInput",
  tickType: "generics",
  libraryName: LibraryPanelTabEnum.generics,
  tabName: "form",
  order: 2,
  libraryPanelShowDetail: {
    title: "文本框",
    content: inputTip,
  },
  tip: {
    title: "文本框",
    content: "文本输入框",
  },
});

export default componentData;
