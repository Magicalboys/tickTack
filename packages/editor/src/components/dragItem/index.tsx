// import React, { useRef, useEffect } from "react";
// import { useDrag, useDrop } from "react-dnd";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   updateFocus,
// } from "@/store/features/counterSlice";
// import {
//   LibraryComponentInstanceData,
// } from "@ticktack/types/src/library-component";
// import { DragProp } from "@ticktack/types/src/drop-drag";
// import { storeData } from "@tickTack/types/src/store";

// /**
//  * TODO: 封装为一个可用的hook
//  */
// interface DragItemProps {
//     children: React.ReactNode;
//     node: LibraryComponentInstanceData;
// }
// const DragItem = (props: DragItemProps) => {
//     // console.log(node)
//     const { children, node } = props;
//   const ref = useRef(null);
//   const contentData = useSelector(
//     (state: Record<string, storeData>) => state.tickTack.contentData
//   );
//   const dispatch = useDispatch();

// //   const allSlotUuid = collectSlotUuid(contentData);
// //   let slotUuid: string | null;

//   /**
//    * 这里的type需要注意，不同功能最好使用不一样的type，建议加个类型做一下区分
//    */
//   const [, drag] = useDrag({
//     type: DragProp.SORT,
//     item: { props: { props } },
//   });

//   const [, drop] = useDrop({
//     accept: DragProp.SORT,
//     // hover(
//     //   item: { props: ExportJson | LibraryComponentInstanceData } & {
//     //     index: number;
//     //   }
//     //   // monitor
//     // ) {
//       // 当悬停在当前元素时,但是悬浮在slot上时不触发这个事件
//       // if (monitor.isOver({ shallow: true })) {
//       //   console.log();
//     //   // }
//     //   const total = [];
//     //   for (const item of allSlotUuid.values()) {
//     //     total.push(...item);
//     //   }
//     //   for (const item of allSlotUuid.keys()) {
//     //     total.push(item);
//     //   }

//       // 判断hover的最终容器的最终位置在哪里——container或者content
//     //   const isExistSlot = total.includes(data.uuid);

//     //   const uuid = (item.props.props as unknown as LibraryComponentInstanceData)
//     //     .uuid;
//     //   if (isExistSlot) {
//     //     // let preIndex: number | null = null;
//     //     let nowIndex: number | null = null;

//     //     //TODO 对可能会触发slot的做统一管理——策略模式
//     //     if (data.componentName === "Slot") {
//     //       slotUuid = data.uuid;
//     //       setWhoElement(false);
//     //     } else {
//     //     //   preIndex = index;
//     //       nowIndex = item.index;
//     //       slotUuid = findNearestSlot(contentData, data.uuid);
//     //       console.log(slotUuid, "slotUuid");
//     //       setWhoElement(true);
//     //     }

//         // 如果在slot里面
//         // setContainer("Slot");
//         // if (uuid) {
//         //   if (preIndex !== null && nowIndex !== null) {
//         //     dispatch(
//         //       swapSlotIndex({ pre: preIndex, now: nowIndex, uuid: slotUuid })
//         //     );
//         //     item.index = index;
//         //   }
//         // }
//     //     if (preIndex !== null && nowIndex !== null) {
//     //       setIndex(preIndex as number);
//     //     }
//     //   } else {
//     //     // uuid存在则说明是可视区域内进行拖动排序
//     //     if (uuid) {
//     //       dispatch(swapIndex({ pre: index, now: item.index }));
//     //       item.index = index;
//     //     }
//     //     setIndex(index);
//     //   }
//     // },
//     // collect: (monitor: DropTargetMonitor) => ({
//     //   canDrop: monitor.canDrop(),
//     //   isOverCurrent: monitor.isOver({ shallow: true }),
//     // }),
//     // options: { ignoreContext: true }, // 阻止hover事件透传,
//   });

//   const handleFocus = (
//     uuid: string,
//     e: React.MouseEvent<HTMLDivElement, MouseEvent>
//   ) => {
//     // 阻止事件冒泡
//     e.stopPropagation();
//     dispatch(updateFocus({ uuid: uuid }));
//   };

// //   const chooseName = () => {
// //     const nameProps: string[] = [];
// //     Object.keys(data.props as LibraryComponentInstanceProps).forEach(
// //       (item) => {
// //         nameProps.push(item);
// //       }
// //     );
// //     return nameProps[0];
// //   };
//   useEffect(() => {
//     drag(ref);
//     drop(ref);
//   }, []);

//   return (
//     <>
//         <div ref={ref} onClick={(e) => handleFocus(node.uuid, e)}>
//             {children}
//         </div>
//     </>
//   );
// };
// export default DragItem;
