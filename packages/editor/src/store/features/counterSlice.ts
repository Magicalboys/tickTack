import { createSlice } from "@reduxjs/toolkit";
import { findComponent } from "@/util";
import { storeData } from "@tickTack/types/src/store";
import { UIInstance } from "@tickTack/types/src/library-component";

/**
 * 全局共享物料
 */

const initialState: storeData = {
  contentData: [],
  ref: null,
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
    addComponent(
      state,
      { payload }: { payload: { json: UIInstance; uuid?: string } }
    ) {
      // 判断传进来的json应该插入到哪里，根据uuid进行判断===》根据容器的uuid找到这个容器
      // 如果放置的是一个容器，那么就将这个json插入到容器里面，如果放置的是一个普通组件，那么就放置在这个组件的下方
      const { json, uuid } = payload;
      if (uuid) {
        const data = findComponent(state.contentData, "uuid", uuid);
        if (!data) return
        data.component.children?.push(json);
      } else {
        state.contentData.push(json);
      }
    },

    /**
     * 更改物料的focus，特殊情况，由于要对contentdata进行操作，故没有使用封装好的findComponent
     */
    updateFocus(state, { payload }: { payload: { uuid: string } }) {
      const recursiveSearch = (
        contentData: UIInstance[],
        uuid: string
      ): UIInstance | null => {
        // 检查当前对象是否是数组
        if (Array.isArray(contentData) && contentData.length > 0) {
          // 遍历数组中的每个元素
          for (const item of contentData) {
            if (item.component.uuid === uuid) {
              item.component.focus = true;
              return item;
            } else {
              item.component.focus = false;
            }
            // 递归搜索数组元素
            if (item.component.children) {
              const result = recursiveSearch(item.component.children, uuid);
              if (result !== null) {
                return result;
              }
            }
          }
        }
        return null; // 未找到目标值
      };
      recursiveSearch(state.contentData, payload.uuid);
    },

    /**
     * 更改物料的props
     * @param state
     * @param param1
     */
    updateJson(
      state,
      {
        payload,
      }: { payload: { control: string; value: unknown; uuid: string } }
    ) {
      const data = findComponent(state.contentData, "uuid", payload.uuid);
      if (data) {
        if (payload.control in data.component.props!) {
          data.component.props![payload.control] = payload.value;
        } else {
          data.component.child = payload.value as string;
        }
      } else {
        console.warn("没有找到对应的组件");
      }
    },

    swapIndex(
      state,
      { payload }: { payload: { dragIndex: number; dropIndex: number } }
    ) {
      const { dragIndex, dropIndex } = payload;
      console.log(dragIndex, "ppppp");
      if (dragIndex !== undefined) {
        const temp = state.contentData[dragIndex];
        state.contentData[dragIndex] = state.contentData[dropIndex];
        state.contentData[dropIndex] = temp;
      }
    },

    /**
     * 删除组件
     */
    deleteComponent(state, { payload }: { payload: { index: number } }) {
      state.contentData.splice(payload.index, 1);
    },

    /**
     * 对预览组件的一系列操作
     */
    controlPreview(state, { payload }: { payload: { json: UIInstance } }) {
      payload.json.component.uuid === "-1";
      state.contentData.push(payload.json);
    },

    /**
     * 内容区的ref，需要提升到全局
     */
    setRef(state, {payload}) {
      state.ref = payload.ref;
    }
  },
});

// 导出actions
export const {
  addComponent,
  updateFocus,
  updateJson,
  swapIndex,
  deleteComponent,
  controlPreview,
  setRef
} = counterSlice.actions;

export default counterSlice.reducer;
