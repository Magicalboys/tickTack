import LibraryItem from "./component/libItem";
import { libraryMap } from "../../../../../library/index";
import { Fragment } from "react";

const App = () => {
  const genericComponent =
    libraryMap &&
    Object.keys(libraryMap).map((item, index) => {
      return (
        <Fragment key={`${item}${index}`}>
          <LibraryItem props={libraryMap[item]}></LibraryItem>
        </Fragment>
      );
    });
  return <>{genericComponent}</>;
};
export default App;
