import { UIInstance, ControlInstanceProps, signalComponent } from '@tickTack/types/src/library-component';

const ComponentControlInstance: ControlInstanceProps = {
  ButtonType: {
    component: {
      type: 'Select',
      label: '按钮类型',
      componentType: 'generics',
      control: 'type',
      props: {
        options: [
          { label: "默认", value: "default" },
          { label: "主色调", value: "primary" },
          { label: "虚线边框", value: "dashed" },
          { label: "纯文本", value: "text" },
          { label: "链接", value: "link" },
        ],
        placeholder: "Please select type"
      }
    }
  },

  ButtonValue: {
    component: {
      type: 'Input',
      label: '按钮名称',
      componentType: 'generics',
      control: 'child',
      props: {
        placeholder: '请输入按钮名称',
      }
    }
  },

  ButtonSize: {
    component: {
      type: 'Select',
      label: '按钮大小',
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
    type: "Button",
    componentType: "generics",
    focus: false,
    props: {
      type: 'primary',
      size: 'large',
    },
    child: '按钮'
  }
};

const Allprops: signalComponent = {
  ComponentInstance,
  ComponentControlInstance,
}

export default Allprops;