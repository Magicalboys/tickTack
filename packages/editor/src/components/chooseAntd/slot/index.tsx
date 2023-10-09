import { useState, useRef, useEffect, Fragment } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { findSlotToInsert } from "../../../store/features/counterSlice";
import { libraryPropsMap } from "../../../../../library";
import { LibraryComponentInstanceData } from "../../../../../types/src/library-component";
import { storeData } from "../../../../../types/src/store";
import { DragProp } from "../../../../../types/src/drop-drag";
import FormContent from "../../Content/component/uniForm";
import { ExportJson } from "../../../../../types/src/library-component";
import "./index.scss";

const App: React.FC<{ uuid: string }> = ({ uuid }) => {
  const dispatch = useDispatch();
  const slotData: LibraryComponentInstanceData | undefined = useSelector(
    (state: Record<string, storeData>) => {
      for (const item of state.tickTack.contentData) {
        if (item.uuid === uuid) {
          return item;
        }
      }
    }
  );
  console.log(slotData, "slotDataSlotDataSlotData");

  const contentData: LibraryComponentInstanceData[] = useSelector(
    (state: Record<string, storeData>) => state.tickTack.contentData
  );
  const length = contentData.length;
  const [index, setIndex] = useState<number>(length);
  const indexRef = useRef(index);

  const handleItem = (item: ExportJson): LibraryComponentInstanceData => {
    let prop;
    for (const propName in libraryPropsMap) {
      if (propName === item.componentData.name) {
        prop = libraryPropsMap[propName];
      } else {
        continue;
      }
    }
    console.log(prop, "prop");
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
  }, [index]);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DragProp.SORT,
      drop: (data: { props: ExportJson; index: number }) => {
        console.log(
          isOver,
          data,
          "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu"
        );
        const _item = handleItem(data.props);
        console.log(_item, "_item");
        dispatch(findSlotToInsert({ componentJson: _item, uuid: uuid }));
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <>
      <div className='slotProp' ref={drop}>
        {(slotData?.children as LibraryComponentInstanceData[])
          ? slotData?.children?.map((item, index) => {
              console.log(item, "ItemItemItem");
              return (
                <>
                  <Fragment key={`${index}${item}`}>
                    <div className="slot_children">
                      <FormContent
                        props={item}
                        index={index}
                        setIndex={setIndex}
                      ></FormContent>
                    </div>
                  </Fragment>
                </>
              );
            })
          : "这是插槽"}
      </div>
    </>
  );
};

export default App;
