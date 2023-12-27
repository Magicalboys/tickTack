import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { DragProp } from "@tickTack/types/src/drop-drag";
import { UIInstance } from "@ticktack/types/src/library-component";
import "./libItem.scss";

const App: React.FC<{ props: UIInstance; index: number }> = ({
  props,
  index,
}) => {
  const name = props.component.type;
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DragProp.SORT,
      item: [props, index],
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
      <div className="libItem_box" ref={ref}>
        <div className="libItem_text">{name} </div>
      </div>
    </>
  );
};
export default App;
