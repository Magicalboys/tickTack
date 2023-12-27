import { Fragment } from 'react';
import { useDispatch } from "react-redux";
import { Form } from "antd";
import {
  ControlInstance,
  UIInstance,
} from "@tickTack/types/src/library-component";
import { render } from "@ticktack/library/src/utils/factory";
import { updateJson } from "@/store/features/counterSlice";
import { instanceControlMap } from "@ticktack/library";
import "./renderBind.scss";

const App: React.FC<{
  componentName: string;
  uuid: string;
  data: UIInstance;
}> = ({ componentName, uuid }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const controlIns = instanceControlMap.get(componentName);
  const controlArr: ControlInstance[] = [];
  if (controlIns) {
    Object.keys(controlIns).forEach((key) => {
      controlArr.push(controlIns[key]);
    });
  }

  const handleUpdate = () => {
    dispatch(updateJson({ uuid: uuid, control: "type", value: "dashed" }));
  };

  const updateValue = (changeValue: Record<string, string>) => {
    console.log(changeValue, 'update', Object.keys(changeValue)[0]);
    const type = Object.keys(changeValue)[0];
    dispatch(updateJson({uuid: uuid, control: type, value: changeValue[type]}))
  };

  return (
    <>
      {controlArr.length &&
        controlArr.map((item) => {
          return (
            <Fragment key={`${item.component.label}`}>
              <Form form={form} onValuesChange={updateValue}>
                <div className="control-div_title" onClick={handleUpdate}>
                  {item.component.label}
                </div>
                <Form.Item
                  name={item.component.control}
                  label={item.component.label}
                  // valuePropName="value"
                >
                  {render(item)}
                </Form.Item>
              </Form>
            </Fragment>
          );
        })}
    </>
  );
};

export default App;
