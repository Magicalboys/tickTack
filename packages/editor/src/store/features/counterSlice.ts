import { createSlice } from "@reduxjs/toolkit";
import { storeData } from "../../../../types/src/store";
import {
  LibraryComponentInstanceProps,
  LibraryComponentInstanceData,
} from "../../../../types/src/library-component";

/**
 * 全局共享物料
 */

const initialState: storeData = {
  contentData: [],
  count: 0,
  contentJson: [],
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
      console.log(payload.index, "indexIndexIndexIndex");
      if (payload.index === 0) {
        state.contentData.push(payload.componentJson);
      } else {
        state.contentData.splice(payload.index, 0, payload.componentJson);
      }
    },

    /**
     * 需要对插槽进行针对性修改
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
      // 先根据uuid选择是属于哪一个slot下面的
      let aimEle: LibraryComponentInstanceData[] = [];
      state.contentData.forEach((item) => {
        if (item.componentName === "Slot") {
          item.children?.forEach((child) => {
            if (child.uuid === payload.uuid) {
              aimEle = item.children as LibraryComponentInstanceData[];
            }
          });
        }
      });
      const temp = aimEle[payload.pre];
      aimEle[payload.pre] = aimEle[payload.now];
      aimEle[payload.now] = temp;
      payload.now = payload.pre;
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
      // 点击更改,先找整体，再找slot
      state.contentData.forEach((itemData) => {
        if (itemData.uuid === payload.uuid) {
          itemData.focus = true;
        } else {
          itemData.focus = false;
        }

        if (itemData.componentName === "Slot") {
          itemData.children?.forEach((child) => {
            if (child.uuid === payload.uuid) {
              child.focus = true;
            } else {
              child.focus = false;
            }
          });
        }
      });
    },

    /**
     * 更新JSON数据
     */
    showContentJson(state, { payload }) {
      console.log(state, payload, "statePayload");
    },

    /**
     *
     */
    updateControlProp(state, { payload }) {
      state.contentData.forEach((item) => {
        if (item.uuid === payload.uuid) {
          (
            (item.props as LibraryComponentInstanceProps)[
              payload.name
            ] as LibraryComponentInstanceProps
          ).defaultValue = payload.defaultValue;
        }

        if (item.componentName === "Slot") {
          item.children?.forEach((child) => {
            if (child.uuid === payload.uuid) {
              (
                (child.props as LibraryComponentInstanceProps)[
                  payload.name
                ] as LibraryComponentInstanceProps
              ).defaultValue = payload.defaultValue;
            }
          });
        }
      });
    },

    /**
     *  根据uuid寻找对应的slot，然后再将后续元素插入到slot里面
     */
    findSlotToInsert(state, { payload }) {
      console.log(payload);
      state.contentData.forEach((item) => {
        if (item.uuid === payload.uuid) {
          item.children?.push(payload.componentJson);
        }
      });
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
} = counterSlice.actions;

export default counterSlice.reducer;
