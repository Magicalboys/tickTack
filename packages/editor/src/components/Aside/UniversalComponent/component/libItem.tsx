import { useDrag, DragPreviewImage } from "react-dnd";
import { LibraryComponent } from "../../../../../../types/src/library-component";
import Icon from "@/assets/react.svg";
import "./libItem.scss";

// 根据配置文件生成control
const App: React.FC<{ props: LibraryComponent }> = ({ props }) => {
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
      type: props.tickType,
      item: props,
      end() {
        console.log(isDragging, "isDragging");
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );
  return (
    <>
      <DragPreviewImage connect={preview} src={Icon}></DragPreviewImage>
      <div
        className="libItem_menu"
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div>{props.name}</div>
      </div>
    </>
  );
};
export default App;
