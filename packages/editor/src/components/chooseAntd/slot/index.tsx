import { useState, useRef, useEffect, Fragment } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { recursiveSearch } from "../../../util/index";
import { useAdaptContainer } from "../../../util/hooks/useAdaptContainer";
import FormContent from "../../Content/component/uniForm";
import {
  findSlotToInsert,
  initChildUuid,
} from "../../../store/features/counterSlice";
import { libraryPropsMap } from "../../../../../library";
import { LibraryComponentInstanceData } from "../../../../../types/src/library-component";
import { storeData } from "../../../../../types/src/store";
import { DragProp } from "../../../../../types/src/drop-drag";
import { ExportJson } from "../../../../../types/src/library-component";
import "./index.scss";

const App: React.FC<{ uuid: string }> = ({ uuid }) => {
  const dispatch = useDispatch();

  const contentData = useSelector(
    (state: Record<string, storeData>) => state.tickTack.contentData
  );

  // 收集插槽
  const slotData: LibraryComponentInstanceData | null = useSelector(
    (state: Record<string, storeData>) => {
      return recursiveSearch(state.tickTack.contentData, uuid);
    }
  );

  let length = 0;
  if (slotData?.children) {
    length = (slotData?.children as LibraryComponentInstanceData[]).length;
  }
  const [index, setIndex] = useState<number>(length);
  const indexRef = useRef(index);

  const [container, setContainer] = useState(""); // 放置的容器信息
  const containerRef = useRef(container);

  const [whoElement, setWhoElement] = useState(false); // 用来判断元素是在slot上hover时drop还是在其它元素上hover时drop
  const whoElementRef = useRef(whoElement);

  const adaptElementRef = useRef(null); // 获取内容元素的引用
  // const adaptContainerRef = useAdaptContainer(adaptElementRef);
  const adaptContainerRef = useRef(null);

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

  useEffect(() => {
    indexRef.current = index;
    containerRef.current = container;
    whoElementRef.current = whoElement;
  }, [index, container, whoElement]);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DragProp.SORT,
      drop: (data: { props: ExportJson; index: number }) => {
        console.log(isOver);
        const _item = handleItem(data.props);
        setIndex(0);
        setContainer("");
        dispatch(initChildUuid()); // 初始化childUuid

        // 获取最外层的slot的uuid
        const slotUuid: string[] = [];
        contentData.forEach((item) => {
          if (item.componentName === "Slot") {
            slotUuid.push(item.uuid);
          }
        });

        console.log(containerRef.current, uuid, slotUuid);

        if (containerRef.current !== "Slot" || whoElementRef.current) {
          // 嵌套的时候，最近的一个slot会走这条道路
          dispatch(
            findSlotToInsert({
              componentJson: _item,
              uuid: uuid,
              index: indexRef.current,
            })
          );
        }
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  useEffect(() => {
    drop(adaptContainerRef);
  }, []);

  return (
    <>
      <div ref={adaptContainerRef} className='slotProp'>
        <div ref={adaptElementRef}>
          {slotData?.children && slotData.children.length > 0 ? (
            slotData?.children?.map((item, index) => {
              return (
                <>
                  <Fragment key={`${index}${item}`}>
                    <div className='slot_children'>
                      <FormContent
                        setContainer={setContainer}
                        props={item}
                        index={index}
                        setIndex={setIndex}
                        setWhoElement={setWhoElement}
                      ></FormContent>
                    </div>
                  </Fragment>
                </>
              );
            })
          ) : (
            <div> 这是插槽</div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
