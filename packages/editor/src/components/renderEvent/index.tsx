import { useSelector } from "react-redux";
import { CounterSliceType } from "@/store";
import { instanceMap } from "@ticktack/library";
import { apis } from "../apis";
import { Fragment } from "react";

const App = () => {
  console.log(instanceMap);

  const contentData = useSelector(
    (state: CounterSliceType) => state.tickTack.contentData
  );
  const { useMessage } = apis;
  const [info, contextHandler] = useMessage({ type: "success", text: "成功" });

  const renderEvent = {
    onClick: {
      message: info,
    },
  };
  return (
    <>
      {contextHandler}
      {contentData.map((item) => {
        const events = item.component.event;
        if (!events) return null;
        for (const event of events) {
          const { insEvents } = event;
          const type = Object.keys(event)[0];
          return (
            <Fragment key={item.component.uuid}>
              {renderEvent[type][insEvents.type]}
            </Fragment>
          );
        }
      })}
    </>
  );
};

export default App;
