import { Input, Select } from "antd";

const App = () => {
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
  return (
    <>
      <div>
        <div style={{ marginTop: "10px" }}>
          <div>类型</div>
          <Select
            options={option}
            style={{ width: "258px", marginTop: "5px" }}
          ></Select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <span>文本</span>
          <Input placeholder="请输入" style={{ marginTop: "50x" }}></Input>
        </div>
      </div>
    </>
  );
};

export default App;
