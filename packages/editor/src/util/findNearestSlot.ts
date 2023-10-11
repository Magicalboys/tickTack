import { LibraryComponentInstanceData } from "../../../types/src/library-component";
/**
 * 根据uuid找到离自己最近的一个插槽的uuid
 */
export const findNearestSlot = (
  contentData: LibraryComponentInstanceData[],
  uuid: string
): string => {
  const findOnce = (data: LibraryComponentInstanceData[]) => {
    let slotUuid: string = "";
    data.forEach((item) => {
      if (item.componentName === "Slot") {
        item.children.forEach((child) => {
          if (child.uuid === uuid) {
            slotUuid = item.uuid;
          } else {
            findOnce(child.children);
          }
        });
      }
    });
    return slotUuid;
  };
  return findOnce(contentData);
};
