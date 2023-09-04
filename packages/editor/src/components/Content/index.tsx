import React, { Fragment } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { addComponent, updateAll } from "../../store/features/counterSlice";
import { LibraryComponent } from "../../../../types/src/library-component";
import FormContent from "./component/uniForm";
import "./style.scss";

const Content: React.FC = () => {
  const dispatch = useDispatch();
  const contentData: LibraryComponent[] = useSelector(
    (state) => state.tickTack.contentData
  );
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "generics" || "container",
      drop: (item: LibraryComponent) => {
        dispatch(addComponent({ componentJson: item }));
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const swapIndex = (pre: number, now: number) => {
    /**需要复制一个全新的数组，不要改变基本原数据 */
    const _contentData = contentData.slice();
    const temp = _contentData[pre];
    _contentData[pre] = _contentData[now];
    _contentData[now] = temp;
    dispatch(updateAll({ componentData: _contentData }));
  };

  return (
    <>
      <div className='container container-content' ref={drop}>
        {contentData.length > 0 &&
          contentData.map((item, index) => {
            return (
              <Fragment key={`${index}${item}`}>
                <FormContent
                  props={item}
                  swapIndex={swapIndex}
                  index={index}
                ></FormContent>
              </Fragment>
            );
          })}
      </div>
    </>
  );
};

export default Content;
