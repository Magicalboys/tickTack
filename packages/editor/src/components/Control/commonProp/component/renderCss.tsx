import { Fragment, useState } from "react";
import ShowContent from "../../../chooseAntd/index";
import {
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
} from "../../../../../../types/src/library-component";

const App: React.FC<{ props: LibraryComponentInstanceData }> = ({ props }) => {
  console.log(props, "oooooooooooooooo");
  const [inputValue, setInputValue] = useState(props.props);
  console.log(inputValue, "DDDDDDDDDDDDDDDDD");
  // const cssProps = props.props as LibraryComponentInstanceProps;
  const cssProps = inputValue as LibraryComponentInstanceProps;
  const tickCss: LibraryComponentInstanceProps[] = [];

  const renderControl = () => {
    Object.keys(cssProps as LibraryComponentInstanceProps).forEach((item) => {
      console.log(cssProps[item], "AAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
      tickCss.push(cssProps[item] as LibraryComponentInstanceProps);
    });
    console.log(tickCss, "tickticktickci");
    return tickCss.map((props, index) => {
      const type: string = props.type as string;
      return (
        <Fragment key={`${props}${index}`}>
          <div>{props.title as string}</div>
          {/* {ShowContent({ props, type, setInputValue })} */}
          <ShowContent
            props={props}
            type={type}
            setInputValue={setInputValue}
          ></ShowContent>
        </Fragment>
      );
    });
  };
  return <>{renderControl()}</>;
};

export default App;
