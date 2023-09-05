import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { updateFocus } from "../../../store/features/counterSlice";
import {
  //   LibraryComponent,
  LibraryComponentInstanceData,
} from "../../../../../types/src/library-component";
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
  const _contentData: LibraryComponentInstanceData[] = useSelector(
    (state) => state.tickTack.contentData
  );
  /**
   * 这里的type需要注意，不同功能最好使用不一样的type，建议加个类型做一下区分
   */
  const [, drag] = useDrag({
    type: "sort",
    item: { props: props, index: index },
  });

  const [, drop] = useDrop({
    accept: "sort",
    hover(item: LibraryComponentInstanceData & { index: number }) {
      swapIndex(index, item.index);
      item.index = index;
    },
  });

  const handleFocus = (uuid: string) => {
    dispatch(updateFocus({ uuid: uuid }));
  };

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);
  return (
    <>
      <div
        ref={ref}
        className='uniForm_component'
        onClick={() => handleFocus(props.uuid)}
      >
        {props.componentName}
      </div>
    </>
  );
};
export default App;
