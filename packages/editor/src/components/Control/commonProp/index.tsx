import React, { useMemo } from "react";
import { Empty } from "antd";
import { useSelector } from "react-redux";
import FormControl from "./component/formControl";
import RenderCss from "./component/renderCss";
import { LibraryComponentInstanceData } from "../../../../../types/src/library-component";
import "./index.scss";
import { storeData } from "../../../../../types/src/store";

const Control: React.FC = () => {
  const contentData: LibraryComponentInstanceData[] = useSelector(
    (state: Record<string, storeData>) => state.tickTack.contentData
  );
  const data = useMemo(() => {
    let result = contentData.find((item) => item.focus);
    if (!result) {
      for (const itemData of contentData) {
        if (itemData.componentName === "Slot") {
          result = itemData.children?.find((child) => child.focus);
        }
        if (result) {
          return result;
        }
      }
    }
    return result;
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
