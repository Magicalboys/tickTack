import { useState } from "react";
import { Select } from "antd";
import ComponentFun from "./componentFun";
import Message from "./message";

const App: React.FC = () => {
  type SelectProps = "componentFun" | "message";
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
  ];

  const handleChange = (value: SelectProps) => {
    setValue(value);
  };

  const selectFunction = {
    componentFun: <ComponentFun></ComponentFun>,
    message: <Message></Message>,
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
