import { Fragment } from "react";
import ShowContent from "../../../chooseAntd/index";
import {
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
} from "../../../../../../types/src/library-component";

const App: React.FC<{ props: LibraryComponentInstanceData }> = ({ props }) => {
  const uuid = props.uuid;
  const tickCss: LibraryComponentInstanceProps[] = [];
  Object.keys(props.props as LibraryComponentInstanceProps).forEach((item) => {
    tickCss.push(
      (props.props as LibraryComponentInstanceProps)[
        item
      ] as LibraryComponentInstanceProps
    );
  });

  const chooseName = (index: number) => {
    const nameProp: string[] = [];
    Object.keys(props.props as LibraryComponentInstanceProps).forEach(
      (item) => {
        nameProp.push(item);
      }
    );
    return nameProp[index];
  };

  const renderControl = () => {
    return tickCss.map((props, index) => {
      const type: string = props.type as string;
      return (
        <Fragment key={`${props}${index}`}>
          <div>{props.title as string}</div>
          <ShowContent
            type={type}
            uuid={uuid}
            name={chooseName(index)}
          ></ShowContent>
        </Fragment>
      );
    });
  };
  return <>{renderControl()}</>;
};

export default App;
