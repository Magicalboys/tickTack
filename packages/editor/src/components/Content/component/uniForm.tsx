import { useRef, useEffect } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useCollectSlotUuid } from "../../../util/useCollectUuid";
import { findNearestSlot } from "../../../util/findNearestSlot";
import ShowContent from "../../chooseAntd/index";
import {
  updateFocus,
  swapIndex,
  swapSlotIndex,
} from "../../../store/features/counterSlice";
import {
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
} from "../../../../../types/src/library-component";
import { DragProp } from "../../../../../types/src/drop-drag";
import { ExportJson } from "../../../../../types/src/library-component";
import { storeData } from "../../../../../types/src/store";
import "./uniform.scss";

/**
 * TODO: 封装为一个可用的hook
 */
const App: React.FC<{
  props: LibraryComponentInstanceData;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setContainer: React.Dispatch<React.SetStateAction<string>>;
}> = ({ props, index, setContainer, setIndex }) => {
  const ref = useRef(null);
  const contentData = useSelector(
    (state: Record<string, storeData>) => state.tickTack.contentData
  );
  // console.log(contentData, "contentData");
  const dispatch = useDispatch();
  const [slotUuid] = useCollectSlotUuid();
  /**
   * 这里的type需要注意，不同功能最好使用不一样的type，建议加个类型做一下区分
   */
  const [, drag] = useDrag({
    type: DragProp.SORT,
    item: { props: { props }, index: index },
  });

  const [, drop] = useDrop({
    accept: DragProp.SORT,
    hover(
      item: { props: ExportJson | LibraryComponentInstanceData } & {
        index: number;
      }
    ) {
      console.log(props.uuid);
      const total = [];
      for (const item of slotUuid.values()) {
        total.push(...item);
      }
      for (const item of slotUuid.keys()) {
        total.push(item);
      }
      // 判断hover的最终容器的最终位置在哪里——container或者content
      const isExistSlot = total.includes(props.uuid);

      const uuid = (item.props.props as unknown as LibraryComponentInstanceData)
        .uuid;
      if (isExistSlot) {
        let slotUuid: string;
        let preIndex: number | null = null;
        let nowIndex: number | null = null;

        //TODO 对可能会触发slot的做统一管理——策略模式
        if (props.componentName === "Slot") {
          slotUuid = props.uuid;
        } else {
          preIndex = index;
          nowIndex = item.index;
          slotUuid = findNearestSlot(contentData, props.uuid);
        }

        // 如果在slot里面
        setContainer("Slot");
        if (uuid) {
          if (preIndex !== null && nowIndex !== null) {
            dispatch(
              swapSlotIndex({ pre: preIndex, now: nowIndex, uuid: slotUuid })
            );
            item.index = index;
          }
        }
        if (preIndex !== null && nowIndex !== null) {
          setIndex(preIndex as number);
        }
      } else {
        // uuid存在则说明是可视区域内进行拖动排序
        if (uuid) {
          dispatch(swapIndex({ pre: index, now: item.index }));
          item.index = index;
        }
        setIndex(index);
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const handleFocus = (
    uuid: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // 阻止事件冒泡
    e.stopPropagation();
    dispatch(updateFocus({ uuid: uuid }));
  };

  const chooseName = (index: number) => {
    const nameProps: string[] = [];
    // console.log(props, "props");
    Object.keys(props.props as LibraryComponentInstanceProps).forEach(
      (item) => {
        nameProps.push(item);
      }
    );
    return nameProps[0];
  };

  const selectComponent = () => {
    return (
      <>
        <div ref={ref} onClick={(e) => handleFocus(props.uuid, e)}>
          <ShowContent
            name={chooseName(index)}
            componentName={props.componentName}
            uuid={props.uuid}
          ></ShowContent>
        </div>
      </>
    );
  };

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);

  return <>{selectComponent()}</>;
};
export default App;
