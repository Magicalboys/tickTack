import { useSelector } from "react-redux";
import LibraryItem from "./component/libItem";
import { libraryMap } from "../../../../../library/index";
import { Fragment } from "react";

const App = () => {
  const count: number = useSelector(
    (state) => state.tickTack.contentData.length
  );
  const genericComponent =
    libraryMap &&
    Object.keys(libraryMap).map((item, index) => {
      return (
        <Fragment key={`${item}${index}`}>
          <LibraryItem props={libraryMap[item]} index={count}></LibraryItem>
        </Fragment>
      );
    });
  return <>{genericComponent}</>;
};
export default App;
