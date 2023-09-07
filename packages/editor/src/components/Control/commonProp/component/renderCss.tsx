import { Fragment } from "react";
import showContent from "../../../chooseAntd/index";
import {
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
} from "../../../../../../types/src/library-component";

const App: React.FC<{ props: LibraryComponentInstanceData }> = ({ props }) => {
  const cssProps = props.props as LibraryComponentInstanceProps;
  const tickCss: LibraryComponentInstanceProps[] = [];

  const renderControl = () => {
    Object.keys(cssProps as LibraryComponentInstanceProps).forEach((item) => {
      tickCss.push(cssProps[item] as LibraryComponentInstanceProps);
    });
    return tickCss.map((props, index) => {
      const type: string = props.type as string;
      return (
        <Fragment key={`${props}${index}`}>
          <div>{props.title as string}</div>
          {showContent({ props, type })}
        </Fragment>
      );
    });
  };
  return <>{renderControl()}</>;
};

export default App;
