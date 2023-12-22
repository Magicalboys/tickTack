import React, { useMemo } from "react";
import { Empty, Button } from "antd";
import { useSelector } from "react-redux";
import FormControl from "./component/formControl";
import { libraryEvent } from "@tickTack/library";
// import RenderCss from "./component/renderCss";
import { LibraryComponentInstanceData } from "@tickTack/types/src/library-component";
import { storeData } from "@tickTack/types/src/store";
import { findFocusIsTrue } from "../../../util/index";
import globalEventEmitter from "@ticktack/event-action/src/index";
import "./index.scss";
import { GenerateControlComponent } from '../../../../factory/index';

const Control: React.FC = () => {
  const contentData: LibraryComponentInstanceData[] = useSelector(
    (state: Record<string, storeData>) => state.tickTack.contentData
  );
  const data = useMemo(() => {
    return findFocusIsTrue(contentData);
  }, [contentData]);

  const controlComponent = data && (
    <div className='tt-content'>
      <FormControl props={data}></FormControl>
      <GenerateControlComponent {...data}></GenerateControlComponent>
    </div>
  );

  const emitDefaultClick = () => {
    console.log(libraryEvent, "libraryEvent");
    console.log(globalEventEmitter);
    globalEventEmitter.emit("Button");
  };

  return (
    <>
      <div className='tt-container-control'>
        {data ? (
          controlComponent
        ) : (
          <>
            <Empty description='请选中画布组件'></Empty>
          </>
        )}
      </div>
      <Button onClick={emitDefaultClick}>点击触发</Button>
    </>
  );
};

export default Control;
