import ShowContent from "../../../chooseAntd/index";
import {
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
} from "../../../../../../types/src/library-component";
import "./renderCss.scss";

const App: React.FC<{ props: LibraryComponentInstanceData }> = ({ props }) => {
  // console.log(props, "props");
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
        <div key={`${props}${index}`} className='tt-control-item'>
          <div className='tt-item-text'>{props.title as string}</div>
          <div className='tt-item-content'>
            <ShowContent
              type={type}
              uuid={uuid}
              name={chooseName(index)}
            ></ShowContent>
          </div>
        </div>
      );
    });
  };
  return <>{renderControl()}</>;
};

export default App;
