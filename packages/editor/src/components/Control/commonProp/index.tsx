import React, { useMemo } from "react";
import { Empty } from "antd";
import { useSelector } from "react-redux";
import FormControl from "./component/formControl";
import RenderCss from "./component/renderCss";
import { LibraryComponentInstanceData } from "../../../../../types/src/library-component";
import "./index.scss";
import { storeData } from "../../../../../types/src/store";
import { findFocusIsTrue } from "../../../util/index";

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
