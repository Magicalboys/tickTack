import React, { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { DragProp } from "@tickTack/types/src/drop-drag";
import { UIInstance } from "@tickTack/types/src/library-component";

interface ChildrenProp {
  children: React.ReactNode;
}

const App: React.FC<ChildrenProp> = (props) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: DragProp.SORT,
        hover: (item: [UIInstance, number]) => {
            console.log(item);
        }
    })
    useEffect(() => {
        drop(ref);
    }, [])
  return (
    <>
      <div ref={ref}>{props.children}</div>
    </>
  );
};

export default App;
