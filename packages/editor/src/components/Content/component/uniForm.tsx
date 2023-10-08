import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import ShowContent from "../../chooseAntd/index";
import { updateFocus, swapIndex } from "../../../store/features/counterSlice";
import {
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
} from "../../../../../types/src/library-component";
import { DragProp } from "../../../../../types/src/drop-drag";
import "./uniform.scss";

/**
 * 适用于form表单相关的元素
 */
const App: React.FC<{
  props: LibraryComponentInstanceData;
  index: number;
  // container: string;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setContainer: React.Dispatch<React.SetStateAction<string>>;
}> = ({ props, index, setIndex, setContainer }) => {
  // console.log(props, "ggggggggggggggggggggggg");
  const ref = useRef(null);
  const dispatch = useDispatch();
  /**
   * 这里的type需要注意，不同功能最好使用不一样的type，建议加个类型做一下区分
   */
  const [, drag] = useDrag({
    type: DragProp.SORT,
    item: { props: props, index: index },
    end(draggedItem, monitor) {
      console.log(draggedItem);
      if (monitor.didDrop()) {
        console.log("uuuuuuuuuuuuuuuuuuu");
      }
    },
  });

  const [, drop] = useDrop({
    accept: DragProp.SORT,
    hover(item: { props: LibraryComponentInstanceData } & { index: number }) {
      //TODO 以后这里还是改为libraryName，先暂时用这个字段
      if (props.componentName === "Slot") {
        setContainer(props.componentName);
        //TODO 判断是否放置在了这个元素之内
        return;
      }
      dispatch(swapIndex({ pre: index, now: item.index }));
      setIndex(index);
      item.index = index;
    },
  });

  const handleFocus = (uuid: string) => {
    dispatch(updateFocus({ uuid: uuid }));
  };

  const chooseName = (index: number) => {
    const nameProps: string[] = [];
    Object.keys(props.props as LibraryComponentInstanceProps).forEach(
      (item) => {
        nameProps.push(item);
      }
    );
    return nameProps[0];
  };

  const selectComponent = () => {
    return (
      <>
        <div ref={ref} onClick={() => handleFocus(props.uuid)}>
          <ShowContent
            uuid={props.uuid}
            name={chooseName(index)}
            componentName={props.componentName}
          ></ShowContent>
        </div>
      </>
    );
  };

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);

  return <>{selectComponent()}</>;
};
export default App;
