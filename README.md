<br>

<h1 align="center">TickTack - Simplify complex things</h1>

<h2 align="center">
让复杂的任务变简单
</h2>

## 项目构建

本项目依托于 pnpm 进行包管理，依托于 monorepo 项目管理。

- 依赖下载
  ```
  pnpm install
  ```
- 启动本地编辑器
  ```
  pnpm editor
  ```
- 启动本地文档
  ```
  pnpm docs
  ```

## 文档贡献

本项目文档基于 `dumi` + `Ant Design主题包` 开发。

进入 `website/`，可做如下工作

- 修改 `.dumirc.ts` 配置文件。
- 编写 `Markdown` 文档。
- `dumi` 采用的 约定式路由，在 `docs`文件夹下新建 `.md` 文件即可创建路由。

## 项目地址

```
pnpm run docs
```

**每个组件的数据形式：**

```tsx
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
```
1. 可分为自定义组件与antd组件，其中antd组件在render的时候自动注册，自定义组件需要在factory文件中手动进行注册。
2. 数据格式如上：分为中间显示的数据以及右侧控制台的数据

[github 地址](https://github.com/Magicalboys/tickTack)
