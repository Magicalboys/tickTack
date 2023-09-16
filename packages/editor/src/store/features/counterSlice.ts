import { createSlice } from "@reduxjs/toolkit";
import { storeData } from "../../../../types/src/store";
import { LibraryComponentInstanceProps } from "../../../../types/src/library-component";

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
      if (payload.index === 0) {
        state.contentData.push(payload.componentJson);
      } else {
        state.contentData.splice(payload.index, 0, payload.componentJson);
      }
    },

    /**
     *
     */
    swapIndex(state, { payload }) {
      const temp = state.contentData[payload.pre];
      state.contentData[payload.pre] = state.contentData[payload.now];
      state.contentData[payload.now] = temp;
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
      // 点击更改
      state.contentData.forEach((itemData) => {
        if (itemData.uuid === payload.uuid) {
          itemData.focus = true;
        } else {
          itemData.focus = false;
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
      });
    },
  },
});

// 导出actions
export const {
  addComponent,
  swapIndex,
  deleteComponent,
  updateAll,
  updateFocus,
  showContentJson,
  updateControlProp,
} = counterSlice.actions;

export default counterSlice.reducer;
