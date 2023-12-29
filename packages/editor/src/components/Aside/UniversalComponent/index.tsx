import { Fragment } from "react";
import LibItem from './LibItem/libItem';
import { instanceMap } from "@ticktack/library";
import { signalComponent } from "@ticktack/types/src/library-component";
import "./style.scss";

const App = () => {
  const boxName: {
    name: string;
    value: signalComponent;
  }[] = [];
  console.log(instanceMap);

  // 对instanceMap进行操作，分别提取其key和value
  for (const [key, value] of instanceMap) {
    boxName.push({ name: key, value: value });
  }

  return (
    <>
    {
      boxName.map((item) => {
        const insData = item.value.ComponentInstance;
        return (
          <Fragment key={`${item.name}`}>
            <LibItem props={insData}></LibItem>
          </Fragment>
        )
      })
    }
    </>
  );
};
export default App;
