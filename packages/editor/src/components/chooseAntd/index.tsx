// /**
//  * 选择性地导出Antd组件
//  */
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import * as Antd from "antd"; // 导入整个 Antd 库
// import { Button } from "antd";
// import TickInput from "./input/index";
// import TickButton from "./button/index";
// import TickSelect from "./select/index";
// import Slot from "./slot/index";
// import {
//   LibraryComponentInstanceData,
//   LibraryComponentInstanceProps,
// } from "@tickTack/types/src/library-component";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const _Antd = Antd;

// const App: React.FC<{
//   uuid: string;
//   name?: string;
//   componentName?: string;
//   type?: string;
// }> = ({ componentName, type, uuid, name }) => {
//   const [fakeProps, setFakeProps] = useState<LibraryComponentInstanceProps>({}); // 控制右侧控制台的prop
//   const [value, setValue] = useState<string>(""); // 控制button的value值
//   const [cssProps, setCssProps] = useState<LibraryComponentInstanceProps>({}); // 控制中间展示台元素的prop

//   const contentData: LibraryComponentInstanceData[] = useSelector(
//     (state: { tickTack: { contentData: LibraryComponentInstanceData[] } }) =>
//       state.tickTack.contentData
//   );

//   const changeProps = (
//     contentData: LibraryComponentInstanceData[],
//     uuid: string
//   ): LibraryComponentInstanceData | null => {
//     // 检查当前对象是否是数组
//     if (Array.isArray(contentData) && contentData.length > 0) {
//       // 遍历数组中的每个元素
//       for (const item of contentData) {
//         if (item.uuid === uuid) {
//           const itemProps = item.props as LibraryComponentInstanceProps;
//           setValue(
//             (itemProps[name as string] as LibraryComponentInstanceProps)
//               .defaultValue as string
//           );
//           setFakeProps(
//             itemProps[name as string] as LibraryComponentInstanceProps
//           );
//           const cssProps: LibraryComponentInstanceProps = {};
//           const fake = item.props as LibraryComponentInstanceProps;
//           Object.keys(fake as LibraryComponentInstanceProps).forEach((item) => {
//             cssProps[
//               (fake[item] as LibraryComponentInstanceProps).control as string
//             ] = (fake[item] as LibraryComponentInstanceProps).defaultValue;
//           });
//           setCssProps(cssProps);
//           return item;
//         }
//         // 递归搜索数组元素
//         const result = changeProps(item.children, uuid);
//         if (result !== null) {
//           return result;
//         }
//       }
//     }
//     return null; // 未找到目标值
//   };

//   useEffect(() => {
//     changeProps(contentData, uuid);
//   }, [contentData]);

//   let ShowContent;
//   // 存在type，表示是控制台的输入渲染，目前有输入框，下拉选择，按钮
//   if (type) {
//     switch (type) {
//       case "string":
//         return (
//           <TickInput
//             fakeProps={fakeProps}
//             value={value}
//             setValue={setValue}
//             uuid={uuid}
//             name={name as string}
//           ></TickInput>
//         );
//       case "select":
//         return (
//           <TickSelect
//             fakeProps={fakeProps}
//             uuid={uuid}
//             name={name as string}
//           ></TickSelect>
//         );
//       default:
//         return <TickButton fakeProps={fakeProps}></TickButton>;
//     }
//   }
//   // 不存在type，表示是画布级别的组件渲染
//   else {
//     if (componentName === "Slot") {
//       return <Slot uuid={uuid}>
//         <div>jjjj</div>
//       </Slot>;
//     } else {
//       ShowContent = _Antd[`${componentName}`];
//       if (componentName === "Button") {
//         return <Button {...cssProps}>{cssProps.value as string}</Button>;
//       } else {
//         return <ShowContent {...cssProps}></ShowContent>;
//       }
//     }
//   }
// };
import React from 'react';
import Button from './button/index';
import Input  from './input/index';
import Select from './select/index';
import Slot from './slot/index';

export type TantdPro = 'Button' | 'Input' | 'Select' | 'Slot';

export type TantdProp = {
  Button: React.FunctionComponent<any>;
  Input: React.FunctionComponent<any>;
  Select: React.FunctionComponent<any>;
  Slot: React.FunctionComponent<any>;
}
export const Tantd: TantdProp = {
  Button: Button,
  Input: Input,
  Select: Select,
  Slot: Slot
}
