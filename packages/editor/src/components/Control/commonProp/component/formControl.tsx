import { Input } from "antd";
import { LibraryComponentInstanceData } from "../../../../../../types/src/library-component";
const App: React.FC<{ props: LibraryComponentInstanceData }> = ({ props }) => {
  return (
    <>
      <div>物料组件唯一标识符（uuid）</div>
      <Input value={props.uuid} disabled></Input>
    </>
  );
};

export default App;
