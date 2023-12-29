import React from "react";
import { Tree } from "antd";
import { useSelector } from "react-redux";
import { CounterSliceType } from "@/store";
import { UIInstance } from "@tickTack/types/src/library-component";

const App: React.FC = () => {
  const contentData = useSelector(
    (state: CounterSliceType) => state.tickTack.contentData
  );

  //@ts-expect-error 暂时没有补类型
  function removeComponent(content: UIInstance) {
    if (content.component) {
      const { component, ...rest } = content;
      if (component.children) {
        //@ts-expect-error 暂时没有补类型
        const updateChildren = component.children.map((child) =>
          removeComponent(child)
        );
        return { ...component, ...rest, children: updateChildren };
      }
      return { ...component, ...rest };
    }
    return content;
  }
  const _componentData = contentData.map((item) => removeComponent(item));

  const componentSelect = () => {};

  return (
    <>
      <Tree
        fieldNames={{ title: "type", key: "uuid" }}
        treeData={_componentData as any}
        showLine
        defaultExpandAll
        onSelect={componentSelect}
      ></Tree>
    </>
  );
};

export default App;
