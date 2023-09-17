import { Select } from "antd";
import { useDispatch } from "react-redux";
import { updateControlProp } from "../../../store/features/counterSlice";
import { LibraryComponentInstanceProps } from "../../../../../types/src/library-component";

const App: React.FC<{
  fakeProps: LibraryComponentInstanceProps;
  uuid: string;
  name: string;
}> = ({ fakeProps, uuid, name }) => {
  const dispatch = useDispatch();
  const handleChange = (value: string) => {
    const defaultValue = value;
    dispatch(updateControlProp({ uuid, name, defaultValue }));
  };
  return (
    <>
      <Select {...fakeProps} onChange={handleChange}></Select>
    </>
  );
};

export default App;