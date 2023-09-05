import React, { useState } from "react";
import { Tabs } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import Common from "./commonProp/index";
import View from "./view/index";
import ToEvent from "./eventTriger/index";

const App: React.FC = () => {
  const [size, setSize] = useState<SizeType>("small");

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
          <View></View>
        </>,
        "外观",
      ];
    } else {
      return [
        <>
          <ToEvent></ToEvent>
        </>,
        "事件",
      ];
    }
  };

  return (
    <div>
      <Tabs
        defaultActiveKey='1'
        type='card'
        size={size}
        items={new Array(3).fill(null).map((_, i) => {
          const id: string = String(i + 1);
          return {
            label: chooseComponent(id)[1],
            key: id,
            children: chooseComponent(id)[0],
          };
        })}
      />
    </div>
  );
};

export default App;
