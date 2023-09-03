import { createSlice } from "@reduxjs/toolkit";
import {
  LibraryComponent,
  LibraryComponentInstanceData,
} from "../../../../types/src/library-component";

export const counterSlice = createSlice({
  name: "tickTack", // 命名空间，在调用action的时候会默认的设置为action的前缀
  // 初始值
  initialState: {
    contentData: [],
  },
  // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
  reducers: {
    /**
     * 添加组件
     * @param state
     * @param param1
     */
    addComponent(state, { payload }) {
      console.log(payload, "payload");
      // state.count = state.count + payload.step; // 内置了immutable
    },

    /**
     * 删除组件
     * @param state
     */
    deleteComponent(state) {
      // state.count -= 1;
    },
  },
});
// 导出actions
export const { addComponent, deleteComponent } = counterSlice.actions;

export default counterSlice.reducer; // 导出reducer，在创建store时使用到
