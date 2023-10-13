import {
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
} from "../../../../../../types/src/library-component";

export const generateCode = (contentData: LibraryComponentInstanceData[]) => {
  const render = (contentData: LibraryComponentInstanceData[]) => {
    let result = "";
    contentData.forEach((item) => {
      let props = "";
      Object.keys(item.props as LibraryComponentInstanceProps).forEach(
        (data) => {
          const key = (
            (item.props as Record<string, unknown>)[data] as Record<
              string,
              unknown
            >
          ).control;
          const value = (
            (item.props as Record<string, unknown>)[data] as Record<
              string,
              unknown
            >
          ).defaultValue;
          props = `${props} ${key} = '${String(value)}'`;
        }
      );
      result = `${result}
      <${item.componentName}${props} />`;
    });
    return `<>
      ${result}
      </>`;
  };

  const code = render(contentData);
  const moduleCode = "";
  return `import React from 'react';
  ${moduleCode}
function App() {
    return (
        ${code}
    );
  }
  
export default App;`;
};
