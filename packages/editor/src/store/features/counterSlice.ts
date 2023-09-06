import { createSlice } from "@reduxjs/toolkit";
import { storeData } from "../../../../types/src/store";

const initialState: storeData = {
  contentData: [],
  focus: false,
};

export const counterSlice = createSlice({
  name: "tickTack", // 命名空间，在调用action的时候会默认的设置为action的前缀

  // 初始值
  initialState,

  reducers: {
    /**
     * 渲染方法
     */
    showContent(state) {
      console.log(state, "state");
    },

    /**
     * 添加组件
     * @param state
     * @param param1
     */
    addComponent(state, { payload }) {
      state.contentData.push(payload.componentJson);
      console.log(state.contentData, "state");
    },

    /**
     * 删除组件
     * @param state
     */
    deleteComponent(state) {
      console.log(state, "state");
      // state.count -= 1;
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
  },
});

// 导出actions
export const {
  showContent,
  addComponent,
  deleteComponent,
  updateAll,
  updateFocus,
} = counterSlice.actions;

export default counterSlice.reducer; // 导出reducer，在创建store时使用到


