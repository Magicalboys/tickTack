import { useSelector } from "react-redux";
import { storeData } from "../../../types/src/store";

/**
 * 收集所有插槽的uuid_{slot<uuid>: [uuid, uuid]}
 */

export const useCollectSlotUuid = () => {
  const contentData = useSelector(
    (state: Record<string, storeData>) => state.tickTack.contentData
  );

  const slotMap = new Map<string, string[]>();

  contentData.forEach((item) => {
    if (item.componentName === "Slot") {
      slotMap.set(item.uuid, []);
      const childUuid: string[] = [];
      item.children?.forEach((child) => {
        childUuid.push(child.uuid);
        slotMap.set(item.uuid, childUuid);
      });
    }
  });

  return [slotMap];
};
