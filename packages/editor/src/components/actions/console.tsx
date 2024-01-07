import { Input } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CounterSliceType } from "@/store";

const App: React.FC = () => {
  const events = useSelector(
    (state: CounterSliceType) => state.tickTack.windowEvent
  );
  console.log(events);
  const [value, setValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };

  return (
    <>
      <div>输出的文本消息</div>
      <Input value={value} placeholder="请输入" onChange={handleChange}></Input>
    </>
  );
};

export default App;
