import { Modal } from "antd";
import { Editor } from "./monaco/index";
import "@/monaco/use-monaco";

const App: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const handleOK = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={"自定义事件触发器-代码编辑器"}
        open={open}
        onOk={handleOK}
        onCancel={handleClose}
      >
        <Editor></Editor>
      </Modal>
    </>
  );
};

export default App;
