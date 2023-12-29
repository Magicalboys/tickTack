import { UIInstance, ControlInstanceProps, signalComponent } from '@tickTack/types/src/library-component';

const ComponentControlInstance: ControlInstanceProps = {

  BlockSize: {
    component: {
      type: 'Select',
      label: 'block大小',
      componentType: 'generics',
      control: 'size',
      props: {
        options: [
          { label: "大", value: "large" },
          { label: "中", value: "middle" },
          { label: "小", value: "small" },
        ],
        placeholder: "Please select size"
      }
    }
  }
}

const ComponentInstance: UIInstance = {
  component: {
    uuid: '',
    type: "Block",
    componentType: "container",
    focus: false,
    children: [],
  }
};

const Allprops: signalComponent = {
  ComponentInstance,
  ComponentControlInstance,
}

export default Allprops;