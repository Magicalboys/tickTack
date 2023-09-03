import LibraryItem from "./component/libItem";
import { LibraryPanelTabEnum } from "../../../../../types/src/panel";
import LibraryTree from "../../../../../library/index";

const App = () => {
  const options = {
    name: "Button",
    libraryName: LibraryPanelTabEnum.generics,
    tickType: "generics",
    tabName: "form",
    tips: {
      title: "按钮",
      content: "点击",
    },
    order: 1,
    libraryPanelShowDetail: {
      title: "按钮",
      content: "点击",
    },
  };
  return (
    <>
      <LibraryItem props={options}></LibraryItem>
    </>
  );
};
export default App;
