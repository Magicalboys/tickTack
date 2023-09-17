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
import {
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
} from "../../../../types/src/library-component";

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
  if (type !== undefined) {
    if (type === "string") {
      return (
        <>
          <TickInput
            fakeProps={fakeProps}
            value={value}
            setValue={setValue}
            uuid={uuid}
            name={name as string}
          ></TickInput>
        </>
      );
    } else if (type === "select") {
      return (
        <TickSelect
          fakeProps={fakeProps}
          uuid={uuid}
          name={name as string}
        ></TickSelect>
      );
    } else {
      return <TickButton fakeProps={fakeProps}></TickButton>;
    }
  } else {
    ShowContent = Antd[`${componentName}`];
    if (componentName === "Button") {
      return <Button {...cssProps}>{cssProps.value as string}</Button>;
    } else {
      return <ShowContent {...cssProps}></ShowContent>;
    }
  }
};

export default App;
