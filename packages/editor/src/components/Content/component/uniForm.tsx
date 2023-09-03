import { LibraryComponent } from "../../../../../types/src/library-component";
/**
 * 适用于form表单相关的元素
 */
const App: React.FC<{ props: LibraryComponent }> = ({ props }) => {
  return (
    <>
      <div>{props.order}</div>
    </>
  );
};
export default App;
