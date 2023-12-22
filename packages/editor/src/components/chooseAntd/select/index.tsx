import { Select } from "antd";
import { useDispatch } from "react-redux";
import { updateControlProp } from "@/store/features/counterSlice";
import { LibraryComponentInstanceProps } from "@tickTack/types/src/library-component";

const App: React.FC<{
  // fakeProps: LibraryComponentInstanceProps;
  // uuid: string;
  // name: string;
}> = () => {
  const dispatch = useDispatch();
  const handleChange = (value: string) => {
    const defaultValue = value;
    // dispatch(updateControlProp({ uuid, name, defaultValue }));
  };
  // console.log(fakeProps, uuid, name)
  return (
    <>
      <Select
        // {...fakeProps}
        // defaultValue={'wujiayu'}
        onChange={handleChange}
        style={{ minWidth: "100px" }}
      ></Select>
    </>
  );
};

export default App;
