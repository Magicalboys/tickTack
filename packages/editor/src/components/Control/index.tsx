import React, { useState } from "react";
import { Tabs } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import Common from "./commonProp/index";
import ViewCss from "./view/index";
import SettingEvent from "./eventTriger/index";
import "./style.scss";

const App: React.FC = () => {
  const [size] = useState<SizeType>("small");

  const chooseComponent = (id: string) => {
    if (id === "1") {
      return [
        <>
          <Common></Common>
        </>,
        "常规",
      ];
    } else if (id === "2") {
      return [
        <>
          <ViewCss></ViewCss>
        </>,
        '全局样式'
      ];
    } else if (id === "3") {
      return [
        <>
          <SettingEvent></SettingEvent>
        </>,
        '事件设置'
      ];
    }
  };

  return (
    <div className="tt-control-container">
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={size}
        items={new Array(3).fill(null).map((_, i) => {
          const id: string = String(i + 1);
          return {
            label: chooseComponent(id)![1],
            key: id,
            children: (
              <div className="tt-container-content">
                {chooseComponent(id)![0]}
              </div>
            ),
          };
        })}
      />
    </div>
  );
};

export default App;
