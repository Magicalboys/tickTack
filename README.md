<br>

<h1 align="center">TickTack - Simplify complex things</h1>

<h2 align="center">
ticktack - 让复杂的任务变简单
</h2>

## 项目构建

```
pnpm install
```

## 文档贡献

本项目文档基于 `dumi` + `Ant Design主题包` 开发。

进入 `website/`，可做如下工作

- 修改 `.dumirc.ts` 配置文件。
- 编写 `Markdown` 文档。
- `dumi` 采用的 约定式路由，在 `docs`文件夹下新建 `.md` 文件即可创建路由。

启动

```
pnpm run docs
```

**每个组件的数据形式：**

- 属性初步采用 object.defineProperty 进行定义，并手动实现双向绑定——数据劫持+发布订阅
- 事件列表初步采用发布订阅设计模式
- 分为公有属性和私有属性：命令式——公有前加`pub`，私有前加`pri`
- 同时可以将不小心触发的操作进行封装：用一个函数或者 hook 统一抛出错误（在 set 和 get 里面）

```json
[
  {
    "indexId": "0f1370b4-ccd7-4c4a-aebd-713205c944be",
    "uuid": "e22532dc-9d61-48f4-b0b6-80af3a309902",
    "libraryName": "generics",
    "component": "tickButton",
    "status": {
      "focus": "true",
      "disable": "true"
    }
    "events": {},
    // 这里放跟组件的元素相关的属性
    "props": {
      "label": "文字",
      "propValue": "文字",
    // 这里专门放css属性
      "style": {
      }
    },
  }
]
```
