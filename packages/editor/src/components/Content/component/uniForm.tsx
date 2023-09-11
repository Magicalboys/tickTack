import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import ShowContent from "../../chooseAntd/index";
import { updateFocus } from "../../../store/features/counterSlice";
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
  swapIndex: (pre: number, now: number) => void;
}> = ({ props, index, swapIndex }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  /**
   * 这里的type需要注意，不同功能最好使用不一样的type，建议加个类型做一下区分
   */
  const [, drag] = useDrag({
    type: DragProp.SORT,
    item: { props: props, index: index },
  });

  const [, drop] = useDrop({
    accept: DragProp.SORT,
    hover(item: LibraryComponentInstanceData & { index: number }) {
      swapIndex(index, item.index);
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
    return nameProps[index];
  };

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);

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
export default App;
