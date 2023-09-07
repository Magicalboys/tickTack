import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import showContent from "../../chooseAntd/index";
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

  // 对props的数据格式进行处理, 提取为可以直接渲染的props
  const cssProps: LibraryComponentInstanceProps =
    props.props as LibraryComponentInstanceProps;

  const tickCss: {
    props: LibraryComponentInstanceProps;
    componentName: string;
  } = {
    props: {},
    componentName: props.componentName,
  };
  Object.keys(cssProps).forEach((item, index) => {
    console.log(item, index);
    tickCss.props[
      (cssProps[item] as LibraryComponentInstanceProps).control as string
    ] = (cssProps[item] as LibraryComponentInstanceProps).defaultValue;
  });

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

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);

  return (
    <>
      <div ref={ref} onClick={() => handleFocus(props.uuid)}>
        {showContent(tickCss)}
      </div>
    </>
  );
};
export default App;
