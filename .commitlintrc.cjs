module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {},
  prompt: {
    types: [
      { value: "✨feat", name: "✨ feat:         新增功能，迭代项目需求" },
      {
        value: "🐞fix",
        name: "🐞 fix:          修复缺陷，修复上一版本存在问题",
      },
      {
        value: "📝docs",
        name: "📝 docs:         更新文档，仅修改文档不修改代码",
      },
      { value: "💄style", name: "💄 style:        变动格式，不影响代码逻辑" },
      {
        value: "♻️refactor",
        name: "♻️  refactor:     重构代码，非新增功能也非修复缺陷",
      },
      {
        value: "⚡️perf",
        name: "⚡️ perf:         优化性能，提高代码执行性能",
      },
      {
        value: "✅test",
        name: "✅ test:         新增测试，追加测试用例验证代码",
      },
      {
        value: "🔧build",
        name: "🔧 build:        更新构建，改动构建工具或外部依赖",
      },
      {
        value: "⏪revert",
        name: "⏪ revert:       代回滚版本，撤销某次代码提交码回退",
      },
    ],
    scopes: [
      { name: "library" }, // 物料组件
      { name: "editor" }, // 页面编辑器
      { name: "constant" }, // 全局常量
      { name: "utils" }, // 全局工具
      { name: "build-utils" }, // 构建帮助工具
      { name: "types" }, // 全局类型定义
    ],
    // it needs to match the value for field type. Eg.: 'fix'
    /*  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },  */
    // override the messages, defaults are as follows
    messages: {
      type: "选择一种你的提交类型:",
      scope: "选择一个scope (可选):",
      // used if allowCustomScopes is true
      customScope: "Denote the SCOPE of this change:",
      subject: "短说明:\n",
      body: '长说明，使用"|"换行(可选)：\n',
      breaking: "非兼容性说明 (可选):\n",
      footer: "关联关闭的issue，例如：#31, #34(可选):\n",
      confirmCommit: "确定提交说明?(yes/no)",
    },
    allowCustomScopes: true,
    allowBreakingChanges: ["特性", "修复"],
    // limit subject length
    subjectLimit: 100,
  },
};
