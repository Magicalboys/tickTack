import LibraryItem from "./component/libItem";
// import { LibraryPanelTabEnum } from "../../../../../types/src/panel";
import libraryTree from "../../../../../library/index";
import { Fragment } from "react";

const App = () => {
  //   const options = {
  //     name: "GenericsLib",
  //     libraryName: LibraryPanelTabEnum.generics,
  //     tickType: "通用组件",
  //     tabsList: {
  //       show: {
  //         title: "展示",
  //       },
  //       form: {
  //         title: "表单",
  //       },
  //       container: {
  //         title: "容器",
  //       },
  //     },
  //   };
  const genericComponent =
    libraryTree &&
    Object.entries(libraryTree).map((item, index) => {
      return (
        <Fragment key={`${item}${index}`}>
          <LibraryItem props={item[1].form[0]}></LibraryItem>
        </Fragment>
      );
    });
  return <>{genericComponent}</>;
};
export default App;
