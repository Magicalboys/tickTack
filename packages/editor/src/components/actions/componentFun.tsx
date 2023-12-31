import { Select } from "antd";

const App: React.FC = () => {
  const option = [
    {
      label: "Button",
      value: "按钮",
    },
  ];
  return (
    <>
      <div>
        <div style={{ marginTop: "10px" }}>组件</div>
        <Select
          options={option}
          style={{ width: "258px", marginTop: "5px" }}
        ></Select>
      </div>
    </>
  );
};

export default App;
