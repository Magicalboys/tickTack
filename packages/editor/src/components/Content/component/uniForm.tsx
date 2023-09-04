import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { LibraryComponent } from "../../../../../types/src/library-component";
import "./uniform.scss";
/**
 * 适用于form表单相关的元素
 */
const App: React.FC<{
  props: LibraryComponent;
  index: number;
  swapIndex: (pre: number, now: number) => void;
}> = ({ props, index, swapIndex }) => {
  const ref = useRef(null);

  /**
   * 这里的type需要注意，不同功能最好使用不一样的type，建议加个类型做一下区分
   */
  const [, drag] = useDrag({
    type: "sort",
    item: { props: props, index: index },
  });

  const [, drop] = useDrop({
    accept: "sort",
    hover(item: LibraryComponent & { index: number }) {
      swapIndex(index, item.index);
      item.index = index;
    },
  });

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);
  return (
    <>
      <div ref={ref} className='uniForm_component'>
        {props.name}
      </div>
    </>
  );
};
export default App;
