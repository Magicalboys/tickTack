import { LibraryComponent } from "../../../../../../types/src/library-component";
// 根据配置文件生成control
const App: React.FC<{ props: LibraryComponent }> = (props) => {
  return (
    <>
      <div>{props.props.libraryName}</div>
    </>
  );
};
export default App;
