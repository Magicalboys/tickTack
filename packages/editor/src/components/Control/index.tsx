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
      return (
        <>
          <Common></Common>
        </>
      );
    } else if (id === "2") {
      return (
        <>
          <View></View>
        </>
      );
    } else if (id === "3") {
      return (
        <>
          <ToEvent></ToEvent>
        </>
      );
    }
  };

  return (
    <div>
      <Tabs
        defaultActiveKey='1'
        type='card'
        size={size}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Card Tab ${id}`,
            key: id,
            children: chooseComponent(id),
          };
        })}
      />
    </div>
  );
};

export default App;
