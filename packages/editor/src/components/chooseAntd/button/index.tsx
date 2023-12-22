import { Button } from "antd";
import { LibraryComponentInstanceProps } from "@tickTack/types/src/library-component";

const App: React.FC<{ fakeProps: LibraryComponentInstanceProps }> = ({
  fakeProps,
}) => {
  return (
    <>
      <Button {...fakeProps}></Button>
    </>
  );
};

export default App;
