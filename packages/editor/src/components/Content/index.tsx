import React, { Fragment, useState, useRef, useEffect } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { addComponent } from "../../store/features/counterSlice";
import { v4 as uuidv4 } from "uuid";
import {
  ExportJson,
  LibraryComponentInstanceData,
} from "../../../../types/src/library-component";
import { storeData } from "../../../../types/src/store";
import { libraryPropsMap } from "../../../../library";
import FormContent from "./component/uniForm";
import { DragProp } from "../../../../types/src/drop-drag";
import "./style.scss";

const Content: React.FC = () => {
  const dispatch = useDispatch();
  const contentData: LibraryComponentInstanceData[] = useSelector(
    (state: Record<string, storeData>) => state.tickTack.contentData
  );
  // console.log(contentData, "contentData");
  const length = contentData.length;
  const [index, setIndex] = useState<number>(length);
  const [container, setContainer] = useState(""); // 放置的容器信息
  const indexRef = useRef(index);
  const containerRef = useRef(container);

  const handleItem = (item: ExportJson): LibraryComponentInstanceData => {
    let prop;
    for (const propName in libraryPropsMap) {
      if (propName === item.componentData.name) {
        prop = libraryPropsMap[propName];
      } else {
        continue;
      }
    }
    const uuid = uuidv4();
    const res = {
      uuid: uuid,
      componentName: item.componentData.name, // 组件名称，可以用来对应展示区应该出现的组件
      libraryName: item.componentData.libraryName,
      focus: false,
      props: prop,
      child: item.componentData.child,
      children: [],
    };
    return res;
  };

  // 拖动展示区中的元素的时候会触发
  useEffect(() => {
    indexRef.current = index;
    containerRef.current = container;
  }, [index, container]);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [DragProp.SORT],
      drop: (data: { props: ExportJson; index: number }, monitor) => {
        console.log(isOver, monitor.getDropResult());
        const _item = handleItem(data.props);
        setIndex(0); // fix: 每次拖动结束之后index更新为0
        setContainer(""); // fix: 每次拖动结束之后container更新为空
        if (containerRef.current !== "Slot") {
          // console.log(containerRef.current, "container");
          dispatch(
            addComponent({ componentJson: _item, index: indexRef.current })
          );
          return;
        }
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );
  return (
    <>
      <div className='container container-content' ref={drop}>
        {contentData.length > 0 &&
          contentData.map((item, index) => {
            return (
              <Fragment key={`${index}${item}`}>
                <FormContent
                  props={item}
                  index={index}
                  // container={container}
                  setIndex={setIndex}
                  setContainer={setContainer}
                ></FormContent>
              </Fragment>
            );
          })}
      </div>
    </>
  );
};

export default Content;
