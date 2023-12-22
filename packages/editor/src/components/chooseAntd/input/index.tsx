// import { useState } from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { updateControlProp } from "@/store/features/counterSlice";
import { LibraryComponentInstanceProps } from "@tickTack/types/src/library-component";

const App: React.FC<{
  fakeProps: LibraryComponentInstanceProps;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  uuid: string;
  name: string;
}> = ({ fakeProps, uuid, name, value, setValue }) => {
  // const [value, setValue] = useState('');

  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    const defaultValue = event.target.value;
    dispatch(updateControlProp({ uuid, name, defaultValue }));
  };
  return (
    <>
      <Input
        // {...fakeProps}
        // value={value}
        // onChange={(event) => handleChange(event)}
      ></Input>
    </>
  );
};

export default App;
