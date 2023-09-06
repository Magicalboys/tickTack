import React, { Fragment } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { addComponent, updateAll } from "../../store/features/counterSlice";
import { v4 as uuidv4 } from "uuid";
import {
  LibraryComponent,
  LibraryComponentInstanceData,
} from "../../../../types/src/library-component";
import { libraryPropsMap } from "../../../../library";
import type { CounterSliceType } from "../../store";
import FormContent from "./component/uniForm";
import "./style.scss";

const Content: React.FC = () => {
  const dispatch = useDispatch();
  const contentData: LibraryComponentInstanceData[] = useSelector(
    (state: CounterSliceType) => state.tickTack.contentData
  );

  const handleItem = (item: LibraryComponent): LibraryComponentInstanceData => {
    console.log('handleItem', item, libraryPropsMap);
    let prop;
    for (const propName in libraryPropsMap) {
      if (propName === item.name) {
        prop = libraryPropsMap[propName];
        console.log(prop, "**********");
      }
    }
    const uuid = uuidv4();
    const res = {
      uuid: uuid,
      focus: false,
      libraryName: item.libraryName,
      componentName: item.name,
      props: prop,
    };
    return res;
  };
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "generics" || "container",
      drop: (item: LibraryComponent) => {
        const _item = handleItem(item);
        console.log(_item, "_item");
        console.log(isOver);
        dispatch(addComponent({ componentJson: _item }));
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
