/**
 * 选择性地导出Antd组件
 */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Antd from "antd"; // 导入整个 Antd 库
import { updateControlProp } from "../../store/features/counterSlice";
import { Input, Button, Select } from "antd";
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
  const dispatch = useDispatch();
  const [fakeProps, setFakeProps] = useState<LibraryComponentInstanceProps>({}); // 控制右侧控制台的prop
  const [value, setValue] = useState<string>(""); // 控制button的value值
  const [cssProps, setCssProps] = useState<LibraryComponentInstanceProps>({}); // 控制中间展示台元素的prop

  const contentData: LibraryComponentInstanceData[] = useSelector(
    (state: { tickTack: { contentData: LibraryComponentInstanceData[] } }) =>
      state.tickTack.contentData
  );
  // console.log(contentData);

  useEffect(() => {
    // if (name) {
    contentData.forEach((item) => {
      if (item.uuid === uuid) {
        const itemProps = item.props as LibraryComponentInstanceProps;
        // console.log(name, "pppppp");
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
    // }
  }, [contentData]);

  const handleChange = (event) => {
    setValue(event.target.value);
    const defaultValue = event.target.value;
    dispatch(updateControlProp({ uuid, name, defaultValue }));
  };

  const handleSelectChange = (value: string) => {
    const defaultValue = value;
    dispatch(updateControlProp({ uuid, name, defaultValue }));
  };

  let ShowContent;
  if (type !== undefined) {
    if (type === "string") {
      return (
        <>
          <Input
            {...fakeProps}
            value={value}
            onChange={(event) => handleChange(event)}
          ></Input>
        </>
      );
    } else if (type === "select") {
      return <Select {...fakeProps} onChange={handleSelectChange}></Select>;
    } else {
      return <Button {...fakeProps}></Button>;
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
