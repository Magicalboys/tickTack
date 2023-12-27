import React, { useMemo } from "react";
import { Empty } from "antd";
import { useSelector } from "react-redux";
import FormControl from "./component/formControl";
import RenderBind from './component/renderBind';
import { findComponent } from "../../../util/index";
import { CounterSliceType } from "@/store";
import "./index.scss";

const Control: React.FC = () => {
  const contentData = useSelector(
    (state: CounterSliceType) => state.tickTack.contentData
  );
  const data = useMemo(() => {
    return findComponent(contentData, 'focus', true);
  }, [contentData]);

  const controlComponent = data && (
    <div className='tt-content'>
      <FormControl props={data}></FormControl>
      <RenderBind componentName={data.component.type} uuid={data.component.uuid!} data = {data}></RenderBind>
    </div>
  );


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
    </>
  );
};

export default Control;
