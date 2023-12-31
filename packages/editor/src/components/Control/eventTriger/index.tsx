import { useState } from "react";
import { Button } from "antd";
import Action from '@/components/actions/index';
import Model from "./component/model/index";
import "./index.scss";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {/* <Empty description='快去创建事件，让你的产品动起来吧'></Empty> */}
      <Action></Action>
      <Button className='addEvent' onClick={handleOpen}>
        添加事件
      </Button>

      <Model open={open} setOpen={setOpen}></Model>
    </>
  );
};

export default App;
