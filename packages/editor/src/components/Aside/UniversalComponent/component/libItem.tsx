import { useEffect, useRef } from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
// import { useSelector } from "react-redux";
import { DragProp } from "../../../../../../types/src/drop-drag";
import { ExportJson } from "../../../../../../types/src/library-component";
import "./libItem.scss";

const App: React.FC<{ props: ExportJson; index: number }> = ({
  props,
  index,
}) => {
  const ref = useRef(null);
  /**
   * 传入参数: {
   *     type: 指定元素的类型，只有类型相同的元素才能进行drop操作
   *     item: 元素在拖拽过程中，描述该对象的数据
   * }
   * 返回参数: {
   *     第一个返回值是一个对象：表示关联在拖拽过程中的变量
   *     第二个返回值代表拖拽元素的ref
   *     第三个返回值代表拖拽元素拖拽后实际操作到的dom
   * }
   */
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: DragProp.SORT,
      item: { props: props, index: index },
      end() {
        console.log(isDragging, "isDragging");
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );
  useEffect(() => {
    drag(ref);
  }, []);
  return (
    <>
      <DragPreviewImage
        connect={preview}
        src='../../../../assets/react.svg'
      ></DragPreviewImage>
      <div className='libItem_menu' ref={ref}>
        <div>{props.componentData.name}</div>
      </div>
    </>
  );
};
export default App;
