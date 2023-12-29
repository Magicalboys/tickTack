import {
  UIInstance,
  ControlInstanceProps,
  signalComponent,
} from "@tickTack/types/src/library-component";

const ComponentControlInstance: ControlInstanceProps = {
  InputType: {
    component: {
      type: "Select",
      label: "输入框类型",
      componentType: "generics",
      control: "status",
      props: {
        options: [
          { label: "错误", value: "error" },
          { label: "警告", value: "warning" },
          { label: "默认值", value: "default" },
        ],
        placeholder: "Please select type",
      },
    },
  },

  InputValue: {
    component: {
      type: "Input",
      label: "输入框名称",
      componentType: "generics",
      control: "value",
      props: {
        placeholder: "请输入输入框名称",
      },
    },
  },

  InputSize: {
    component: {
      type: "Select",
      label: "输入框大小",
      componentType: "generics",
      control: "size",
      props: {
        options: [
          { label: "大", value: "large" },
          { label: "中", value: "middle" },
          { label: "小", value: "small" },
        ],
        placeholder: "Please select size",
      },
    },
  },
};

const ComponentInstance: UIInstance = {
  component: {
    uuid: "",
    type: "Input",
    componentType: "generics",
    focus: false,
    props: {
      status: "error",
      size: "large",
      placeholder: "请输入内容",
      value: '你好'
    },
  },
};

const Allprops: signalComponent = {
  ComponentInstance,
  ComponentControlInstance,
};

export default Allprops;
