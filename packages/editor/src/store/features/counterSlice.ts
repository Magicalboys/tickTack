import { createSlice } from "@reduxjs/toolkit";
import { storeData } from "@tickTack/types/src/store";
import {
  LibraryComponentInstanceProps,
  LibraryComponentInstanceData,
} from "@tickTack/types/src/library-component";

/**
 * 全局共享物料
 */

const initialState: storeData = {
  contentData: [],
  count: 0,
  contentJson: [],
  propUuid: "",
};

export const counterSlice = createSlice({
  name: "tickTack", // 命名空间，在调用action的时候会默认的设置为action的前缀

  // 初始值
  initialState,

  reducers: {
    /**
     * 添加组件,根据index插入
     * @param state
     * @param param1
     */
    addComponent(state, { payload }) {
      // console.log(payload.index, "indexIndexIndexIndex");
      if (payload.index === 0) {
        state.contentData.push(payload.componentJson);
      } else {
        state.contentData.splice(payload.index, 0, payload.componentJson);
      }
    },

    /**
     * 对content里面的元素进行排序
     */
    swapIndex(state, { payload }) {
      const temp = state.contentData[payload.pre];
      state.contentData[payload.pre] = state.contentData[payload.now];
      state.contentData[payload.now] = temp;
      payload.now = payload.pre;
    },

    /**
     * 对插槽内的元素进行排序
     */
    swapSlotIndex(state, { payload }) {
      const recursiveSearch = (
        contentData: LibraryComponentInstanceData[],
        uuid: string
      ): LibraryComponentInstanceData | null => {
        // 检查当前对象是否是数组
        if (Array.isArray(contentData) && contentData.length > 0) {
          // 遍历数组中的每个元素
          for (const item of contentData) {
            if (item.uuid === uuid) {
              const temp = item.children[payload.pre];
              item.children[payload.pre] = item.children[payload.now];
              item.children[payload.now] = temp;
              payload.now = payload.pre;
              return item;
            }
            // 递归搜索数组元素
            const result = recursiveSearch(item.children, uuid);
            if (result !== null) {
              return result;
            }
          }
        }
        return null; // 未找到目标值
      };
      recursiveSearch(state.contentData, payload.uuid);
    },

    /**
     * 删除组件
     * @param state
     */
    deleteComponent(state) {
      console.log(state, "state");
    },

    /**
     * 从根节点开始更新
     */
    updateAll(state, { payload }) {
      state.contentData = payload.componentData;
    },

    /**
     * 更改物料的focus
     */
    updateFocus(state, { payload }) {
      const recursiveSearch = (
        contentData: LibraryComponentInstanceData[],
        uuid: string
      ): LibraryComponentInstanceData | null => {
        // 检查当前对象是否是数组
        if (Array.isArray(contentData) && contentData.length > 0) {
          // 遍历数组中的每个元素
          for (const item of contentData) {
            if (item.uuid === uuid) {
              item.focus = true;
              return item;
            } else {
              item.focus = false;
            }
            // 递归搜索数组元素
            const result = recursiveSearch(item.children, uuid);
            if (result !== null) {
              return result;
            }
          }
        }
        return null; // 未找到目标值
      };
      recursiveSearch(state.contentData, payload.uuid);
    },

    /**
     * 更新JSON数据
     */
    showContentJson(state, { payload }) {
      console.log(state, payload, "statePayload");
    },

    /**
     * 更改元素的props
     */
    updateControlProp(state, { payload }) {
      const recursiveSearch = (
        contentData: LibraryComponentInstanceData[],
        uuid: string
      ): LibraryComponentInstanceData | null => {
        // console.log(payload.uuid, "uuid");
        // 检查当前对象是否是数组
        if (Array.isArray(contentData) && contentData.length > 0) {
          // 遍历数组中的每个元素
          for (const item of contentData) {
            if (item.uuid === uuid) {
              (
                (item.props as LibraryComponentInstanceProps)[
                  payload.name
                ] as LibraryComponentInstanceProps
              ).defaultValue = payload.defaultValue;
              return item;
            }

            // 递归搜索数组元素
            const result = recursiveSearch(item.children, uuid);
            if (result !== null) {
              return result;
            }
          }
        }
        return null; // 未找到目标值
      };
      recursiveSearch(state.contentData, payload.uuid);
    },

    /**
     *  根据uuid寻找对应的slot，然后再将后续元素插入到slot里面
     */
    findSlotToInsert(state, { payload }) {
      const recursiveSearch = (
        contentData: LibraryComponentInstanceData[],
        uuid: string
      ): LibraryComponentInstanceData | null => {
        // 检查当前对象是否是数组
        if (Array.isArray(contentData) && contentData.length > 0) {
          // 遍历数组中的每个元素
          for (const item of contentData) {
            if (item.uuid === uuid) {
              if (payload.index === 0) {
                item.children.push(payload.componentJson);
              } else {
                item.children.splice(
                  payload.index + 1,
                  0,
                  payload.componentJson
                );
              }
              return item;
            }

            // 递归搜索数组元素
            const result = recursiveSearch(item.children, uuid);
            if (result !== null) {
              return result;
            }
          }
        }
        return null; // 未找到目标值
      };
      recursiveSearch(state.contentData, payload.uuid);
    },

    updateChildUuid(state, { payload }) {
      state.propUuid = payload.uuid;
    },

    initChildUuid(state) {
      state.propUuid = "";
    },
  },
});

// 导出actions
export const {
  addComponent,
  swapIndex,
  swapSlotIndex,
  deleteComponent,
  updateAll,
  updateFocus,
  showContentJson,
  updateControlProp,
  findSlotToInsert,
  updateChildUuid,
  initChildUuid,
} = counterSlice.actions;

export default counterSlice.reducer;
