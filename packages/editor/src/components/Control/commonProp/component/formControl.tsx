import { Input } from "antd";
import { UIInstance } from "@tickTack/types/src/library-component";
const App: React.FC<{ props: UIInstance }> = ({ props }) => {
  return (
    <>
      <div>物料组件唯一标识符（uuid）</div>
      <Input value={props.component.uuid} disabled></Input>
    </>
  );
};

export default App;
