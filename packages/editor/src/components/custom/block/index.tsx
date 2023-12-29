import React from "react";
import { useDrop } from "react-dnd";
import { DragProp } from "@tickTack/types/src/drop-drag";
import './index.scss';

interface CustomProps {
  children: React.ReactNode;
  uuid: string;
}

const App: React.FC<CustomProps> = (props) => {
  const { children, uuid } = props;
  console.log(props);

  const [{ canDrop }, drop] = useDrop({
    accept: DragProp.SORT,
    drop: (_, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
            return;
        }
        return {
            uuid,
        }
    },
    collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    })
  })

  const style: React.CSSProperties = {
    border: canDrop ? '1px dashed #ccc' : '2px dashed red'
  }

  //@ts-expect-error 暂时性处理
  return <div className="block-div_father" ref={drop} style={style} uuid={uuid}>{children}</div>;
};

export default App;
