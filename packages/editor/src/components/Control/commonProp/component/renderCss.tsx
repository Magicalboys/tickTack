import { LibraryComponentInstanceData } from "../../../../../../types/src/library-component";

const App: React.FC<{ props: LibraryComponentInstanceData }> = ({ props }) => {
  console.log(props, "___________________");
  const cssProps = props.props;
  for (const item in cssProps) {
    console.log(
      item,
      Object.prototype.toString.call(cssProps[item]),
      "cssProps"
    );
  }
  return (
    <>
      <div>hello world</div>
    </>
  );
};

export default App;
