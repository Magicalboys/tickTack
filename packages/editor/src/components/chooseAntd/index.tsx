/**
 * 选择性地导出Antd组件
 */
import * as Antd from "antd"; // 导入整个 Antd 库
import { useState } from "react";
import {
  LibraryComponentInstanceProps,
  // LibraryComponentInstanceData,
} from "../../../../types/src/library-component";
// import { useState } from "react";

const App: React.FC<{
  props: LibraryComponentInstanceProps;
  componentName?: string;
  type?: string;
  setInputValue?: React.Dispatch<
    React.SetStateAction<LibraryComponentInstanceProps | undefined>
  >;
}> = ({ props, componentName, type, setInputValue }) => {
  const [value, setValue] = useState<string>(props.defaultValue as string);
  console.log(props, "props");
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value, "AAAAAAAAAAAA");
    setInputValue((inputValue) => ({
      ...inputValue,
      title: {
        ...props,
        defaultValue: event.target.value,
      },
    }));
  };

  let ShowContent;
  if (type !== undefined) {
    if (type === "string") {
      ShowContent = Antd["Input"];
      return (
        <>
          <ShowContent
            {...props}
            value={value as string}
            onChange={(event) => handleChange(event)}
          ></ShowContent>
        </>
      );
    } else if (type === "select") {
      ShowContent = Antd["Select"];
      return <ShowContent {...props}></ShowContent>;
    } else {
      return <Antd.Button {...props}>jj</Antd.Button>;
    }
  } else {
    ShowContent = Antd[`${componentName}`];
    return <Antd.Input {...props}></Antd.Input>;
  }
  // return (
  //   <>
  //     <ShowContent {...props}></ShowContent>
  //   </>
  // );
};

export default App;
