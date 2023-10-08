/**
 * 选择性地导出Antd组件
 */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Antd from "antd"; // 导入整个 Antd 库
import { Button } from "antd";
import TickInput from "./input/index";
import TickButton from "./button/index";
import TickSelect from "./select/index";
import Slot from "./slot/index";
import {
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
} from "../../../../types/src/library-component";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _Antd: any = Antd;

const App: React.FC<{
  uuid: string;
  name?: string;
  componentName?: string;
  type?: string;
}> = ({ componentName, type, uuid, name }) => {
  const [fakeProps, setFakeProps] = useState<LibraryComponentInstanceProps>({}); // 控制右侧控制台的prop
  const [value, setValue] = useState<string>(""); // 控制button的value值
  const [cssProps, setCssProps] = useState<LibraryComponentInstanceProps>({}); // 控制中间展示台元素的prop

  const contentData: LibraryComponentInstanceData[] = useSelector(
    (state: { tickTack: { contentData: LibraryComponentInstanceData[] } }) =>
      state.tickTack.contentData
  );

  useEffect(() => {
    contentData.forEach((item) => {
      if (item.uuid === uuid) {
        const itemProps = item.props as LibraryComponentInstanceProps;
        setValue(
          (itemProps[name as string] as LibraryComponentInstanceProps)
            .defaultValue as string
        );
        setFakeProps(
          itemProps[name as string] as LibraryComponentInstanceProps
        );
        const cssProps: LibraryComponentInstanceProps = {};
        const fake = item.props as LibraryComponentInstanceProps;
        Object.keys(fake as LibraryComponentInstanceProps).forEach((item) => {
          cssProps[
            (fake[item] as LibraryComponentInstanceProps).control as string
          ] = (fake[item] as LibraryComponentInstanceProps).defaultValue;
        });
        setCssProps(cssProps);
      }
    });
  }, [contentData]);

  let ShowContent;
  // 存在type，表示是控制台的输入渲染，目前有输入框，下拉选择，按钮
  if (type) {
    switch (type) {
      case "string":
        return (
          <TickInput
            fakeProps={fakeProps}
            value={value}
            setValue={setValue}
            uuid={uuid}
            name={name as string}
          ></TickInput>
        );
      case "select":
        return (
          <TickSelect
            fakeProps={fakeProps}
            uuid={uuid}
            name={name as string}
          ></TickSelect>
        );
      default:
        return <TickButton fakeProps={fakeProps}></TickButton>;
    }
  }
  // 不存在type，表示是画布级别的组件渲染
  else {
    if (componentName === "Slot") {
      // console.log("slotSlot");
      return <Slot uuid={uuid}></Slot>;
    } else {
      ShowContent = _Antd[`${componentName}`];
      if (componentName === "Button") {
        // console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
        return <Button {...cssProps}>{cssProps.value as string}</Button>;
      } else {
        return <ShowContent {...cssProps}></ShowContent>;
      }
    }
  }
};

export default App;
