import React, { Fragment } from "react";
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
  const handleControl = () => {
    if (contentData.length > 0) {
      return contentData.map((item, index) => {
        if (item.focus === true)
          return (
            <Fragment key={`${item}${index}`}>
              <FormControl props={item}></FormControl>
              <RenderCss props={item}></RenderCss>
            </Fragment>
          );
      });
    } else {
      return (
        <>
          <Empty description="请选中画布组件"></Empty>
        </>
      );
    }
  };

  return (
    <>
      <div className='container-control'>{handleControl()}</div>
    </>
  );
};

export default Control;
