import React, { useState } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
// import { Button } from "antd";
import { LibraryComponent } from "../../../../types/src/library-component";
import FormContent from "./component/uniForm";
import "./style.scss";

const Content: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const [content, setContent] = useState<LibraryComponent | undefined>();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "generics" || "container",
      drop: (item: LibraryComponent) => {
        console.log(item, "item");
        setContent(item);
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [x, y]
  );
  return (
    <>
      <div className='container container-content' ref={drop}>
        {/* <Button>{content?.name}</Button> */}
        <FormContent props={content as LibraryComponent}></FormContent>
      </div>
    </>
  );
};

export default Content;
