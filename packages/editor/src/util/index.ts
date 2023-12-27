import { UIInstance } from "@tickTack/types/src/library-component";

// 根据条件找到组件，这个条件只能是独一无二的，比如说focus以及uuid
export const findComponent = (
  contentData: UIInstance[],
  condition: "uuid" | "focus",
  value: string | boolean
): UIInstance | null => {
  // 检查当前对象是否是数组
  if (Array.isArray(contentData) && contentData.length > 0) {
    // 遍历数组中的每个元素
    for (const item of contentData) {
      if (item.component[condition] === value) return item;
      // 递归搜索数组元素
      if (item.component.children && item.component.children.length) {
        const result = findComponent(item.component.children, condition, value);
        if (result !== null) {
          return result;
        }
      }
    }
  }

  return null; // 未找到目标值
};