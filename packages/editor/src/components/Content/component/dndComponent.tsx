import React, { useEffect, useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { swapIndex } from "@/store/features/counterSlice";
import { DragProp } from "@tickTack/types/src/drop-drag";
import OrderListPng from "../../../../public/order-list.png";

interface ChildrenProp {
  children: React.ReactNode;
  index: number;
}

const App: React.FC<ChildrenProp> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { children, index } = props;
  const pngStyle: React.CSSProperties = {
    position: "absolute",
    width: 20,
    height: 20,
    zIndex: 999,
    right: 6,
    cursor: "move",
  };

  const [ ,drag, dragPreview] = useDrag(
    {
      type: DragProp.SORT,
      collect: (monitor) => ({
        isOver: monitor.isDragging(),
      }),
      item: { index },
    },
    []
  );

  // @ts-expect-error 暂时使用
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DragProp.SORT,

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),

    canDrop: () => {
      return true;
    },

    // @ts-expect-error nothing
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const dropIndex = index;

      if (dragIndex === dropIndex) {
        return;
      }
      
      //   执行交换index函数
      dispatch(swapIndex({ dragIndex, dropIndex }));
      if (item.index !== undefined) {
        item.index = dropIndex;
      }
    },
  });

  const isActive = canDrop && isOver;

  const style: React.CSSProperties = {
    position: "relative",
    border: isActive ? "2px solid blueviolet" : "",
    verticalAlign: 40,
  };

  useEffect(() => {
    dragPreview(drop(ref));
  }, []);

  return (
    <>
      <div ref={ref} style={style}>
        {drag && drag(<img src={OrderListPng} alt="pic" style={pngStyle} />)}
        {children}
      </div>
    </>
  );
};

export default App;
