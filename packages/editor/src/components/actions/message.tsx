import { useState } from "react";
import { Input, Select } from "antd";
import { MessageType } from "../apis/useMessage";

const App = () => {
  const [type, setType] = useState<MessageType>("success");
  const [text, setText] = useState("成功");
  const option = [
    {
      label: "成功",
      value: "success",
    },
    {
      label: "失败",
      value: "error",
    },
    {
      label: "警告",
      value: "warning",
    },
  ];

  const handleSelectChange = (type: MessageType) => {
    setType(type);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    console.log(event.target.value);
  };
  return (
    <>
      <div>
        <div style={{ marginTop: "10px" }}>
          <div>类型</div>
          <Select
            value={type}
            options={option}
            style={{ width: "258px", marginTop: "5px" }}
            onChange={handleSelectChange}
          ></Select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <span>文本</span>
          <Input
            placeholder="请输入"
            style={{ marginTop: "50x" }}
            value={text}
            onChange={handleInputChange}
          ></Input>
        </div>
      </div>
    </>
  );
};

export default App;
