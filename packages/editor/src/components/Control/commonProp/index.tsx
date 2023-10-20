import React, { useMemo } from "react";
import { Empty, Button } from "antd";
import { useSelector } from "react-redux";
import FormControl from "./component/formControl";
import { libraryEvent } from "../../../../../library";
import RenderCss from "./component/renderCss";
import { LibraryComponentInstanceData } from "../../../../../types/src/library-component";
import "./index.scss";
import { storeData } from "../../../../../types/src/store";
import { findFocusIsTrue } from "../../../util/index";
import globalEventEmitter from "../../../../../event-action/src/index";

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
      <RenderCss props={data}></RenderCss>
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
