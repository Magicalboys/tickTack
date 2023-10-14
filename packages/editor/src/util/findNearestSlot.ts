// import { LibraryComponentInstanceData } from "../../../types/src/library-component";
// /**
//  * 根据uuid找到离自己最近的一个插槽的uuid
//  */
// export const findNearestSlot = (
//   contentData: LibraryComponentInstanceData[],
//   uuid: string
// ): string => {
//   const findOnce = (
//     contentData: LibraryComponentInstanceData[],
//     uuid: string
//   ): string => {
//     // 检查当前对象是否是数组
//     if (Array.isArray(contentData) && contentData.length > 0) {
//       // 遍历数组中的每个元素
//       for (const item of contentData) {
//         if (item.uuid === uuid) {
//           item.focus = true;
//           return item.uuid;
//         } else {
//           item.focus = false;
//         }
//         // 递归搜索数组元素
//         const result = findOnce(item.children, uuid);
//         if (result !== null) {
//           return result;
//         }
//       }
//     }
//     return ""; // 未找到目标值
//   };
//   return findOnce(contentData, uuid);
// };
