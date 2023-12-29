import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addComponent } from "@/store/features/counterSlice";
import { DragProp } from "@tickTack/types/src/drop-drag";
import { UIInstance } from "@ticktack/types/src/library-component";
import "./libItem.scss";

const App: React.FC<{ props: UIInstance }> = ({
  props,
}) => {
  const name = props.component.type;
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [, drag, dragPreview] = useDrag(
    () => ({
      type: DragProp.SORT,
      item() {
        return { props };
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      end(_, monitor) {
        const item = monitor.getItem();
        const result = monitor.getDropResult();
        if (monitor.didDrop() && result) {
          const { props } = item;
          const _props = {
            component: {
              ...props.component,
              uuid: uuidv4(),
            },
          };
          //@ts-expect-error 当组件放置在容器上面时，就会返回uuid
          if (result.uuid) {
            //@ts-expect-error 当组件放置在容器上面时，就会返回uuid
            dispatch(addComponent({json: _props, uuid: result.uuid}))
          } else {
            dispatch(addComponent({ json: _props }));            
          }
        }
      },
    }),
    []
  );

  useEffect(() => {
    dragPreview(drag(ref));
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
