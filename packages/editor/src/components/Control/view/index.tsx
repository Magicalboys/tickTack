import { Fragment } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "@/components/apis";
import { insertEvent } from "@/store/features/counterSlice";
import { CounterSliceType } from "@/store";
import { SelectProps } from "@tickTack/types/src/library-component";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const events = useSelector(
    (state: CounterSliceType) => state.tickTack.windowEvent
  );

  const eventNames = Object.keys(events);

  const options = [
    {
      label: "组件方法",
      value: "componentFun",
    },
    {
      label: "消息提示",
      value: "message",
    },
    {
      label: "消息输出",
      value: "console",
    },
  ];

  const handleChange = (value: SelectProps) => {
    dispatch(
      insertEvent({
        eventName: value,
        listener: apis.find((api) => api.name === value)!.action.toString(),
      })
    );
  };

  return (
    <>
      <div>请选择全局事件</div>
      <Select
        placeholder="请选择全局事件"
        style={{ width: "258px" }}
        options={options}
        onChange={handleChange}
      ></Select>
      <div style={{ marginTop: 10 }}>已经配置的全局事件</div>
      {eventNames.map((name) => {
        return (
          <Fragment key={name}>
            <div>{name}</div>
          </Fragment>
        );
      })}
    </>
  );
};

export default App;
