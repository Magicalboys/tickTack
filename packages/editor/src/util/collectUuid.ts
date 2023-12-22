import { LibraryComponentInstanceData } from "@tickTack/types/src/library-component";

/**
 * 默认收集页面最外层元素的uuid，如果传入uuid则收集uuid那一层的uuid
 */
export const collectUuid = (
  contentData: LibraryComponentInstanceData[],
  uuid?: string
) => {
  const eleUuid: string[] = [];
  if (uuid) {
    const slotData = contentData.find((item) => item.uuid === uuid);
    slotData?.children?.forEach((item) => {
      eleUuid.push(item.uuid);
    });
  } else {
    contentData.forEach((item) => {
      eleUuid.push(item.uuid);
    });
  }
  return eleUuid;
};
