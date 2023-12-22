import { LibraryComponentInstanceData } from "@tickTack/types/src/library-component";

/**
 * 根据uuid找到插槽Slot
 * @param contentData
 */
export function recursiveSearch(
  contentData: LibraryComponentInstanceData[],
  uuid: string
): LibraryComponentInstanceData | null {
  // 检查当前对象是否是数组
  if (Array.isArray(contentData) && contentData.length > 0) {
    // 遍历数组中的每个元素
    for (const item of contentData) {
      if (item.uuid === uuid) return item;
      // 递归搜索数组元素
      const result = recursiveSearch(item.children, uuid);
      if (result !== null) {
        return result;
      }
    }
  }

  return null; // 未找到目标值
}

/**
 * 找到focus为true的元素
 */
export function findFocusIsTrue(
  contentData: LibraryComponentInstanceData[]
): LibraryComponentInstanceData | null {
  // 检查当前对象是否是数组
  if (Array.isArray(contentData) && contentData.length > 0) {
    // 遍历数组中的每个元素
    for (const item of contentData) {
      if (item.focus === true) return item;
      // 递归搜索数组元素
      const result = findFocusIsTrue(item.children);
      if (result !== null) {
        return result;
      }
    }
  }

  return null; // 未找到目标值
}

/**
 * 收集所有插槽的uuid
 */
export const collectSlotUuid = (
  contentData: LibraryComponentInstanceData[]
) => {
  const slotMap = new Map<string, string[]>();
  const recur = (
    contentData: LibraryComponentInstanceData[]
  ): LibraryComponentInstanceData | null => {
    if (Array.isArray(contentData) && contentData.length > 0) {
      // 遍历数组中的每个元素
      for (const item of contentData) {
        // console.log(contentData);
        if (item.componentName === "Slot") {
          slotMap.set(item.uuid, []);
          const childUuid: string[] = [];
          if (item.children && item.children.length) {
            for (const child of item.children) {
              childUuid.push(child.uuid);
              slotMap.set(item.uuid, childUuid);
            }
          }
        }
        // 递归搜索数组元素
        const result = recur(item.children);
        if (result !== null) {
          return result;
        }
      }
    }

    return null; // 未找到目标值
  };
  recur(contentData);
  return slotMap;
};

/**
 * 根据uuid找到离自己最近的一个插槽的uuid
 */
export const findNearestSlot = (
  contentData: LibraryComponentInstanceData[],
  uuid: string
): string | null => {
  const allSlotUuid = collectSlotUuid(contentData);
  for (const [key, item] of allSlotUuid) {
    if (item.includes(uuid)) {
      return key;
    }
  }
  return null;
};
