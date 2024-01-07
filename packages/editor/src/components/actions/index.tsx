import { useState } from "react";
import { Select } from "antd";
import { SelectProps } from "@tickTack/types/src/library-component";
import ComponentFun from "./componentFun";
import Message from "./message";
import Console from './console';

const App: React.FC = () => {
  const [value, setValue] = useState<SelectProps>("componentFun");
  const option = [
    {
      label: "组件方法",
      value: "componentFun",
    },
    {
      label: "消息提示",
      value: "message",
    },
    {
      label: '消息输出',
      value: 'console'
    }
  ];

  const handleChange = (value: SelectProps) => {
    setValue(value);
  };

  const selectFunction = {
    componentFun: <ComponentFun></ComponentFun>,
    message: <Message></Message>,
    console: <Console></Console>
  };

  return (
    <>
      <div>
        <div>动作类型</div>
        <Select
          options={option}
          style={{ width: "258px",marginTop: '5px' }}
          value={value}
          onChange={handleChange}
        ></Select>
      </div>
      {selectFunction[value]}
    </>
  );
};

export default App;
