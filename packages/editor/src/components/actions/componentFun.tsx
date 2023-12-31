import { Select } from "antd";
import { useState } from "react";

const App: React.FC = () => {
  const [component, setComponent] = useState("按钮");
  const option = [
    {
      label: "Button",
      value: "按钮",
    },
  ];

  const handleChange = (component: string) => {
    setComponent(component);
  };
  
  return (
    <>
      <div>
        <div style={{ marginTop: "10px" }}>组件</div>
        <Select
          value={component}
          onChange={handleChange}
          options={option}
          style={{ width: "258px", marginTop: "5px" }}
        ></Select>
      </div>
    </>
  );
};

export default App;
