/**
 * 这个函数暂时保留着，后面注意重构掉，换为另一种方式进行编辑器的书写，可以参考monaco的github里面的docs
 * @param monaco
 */

export function configureMonaco(monaco: typeof import("monaco-editor")) {
  monaco.languages.register({ id: "jsx" });

  // JSX语言的配置
  monaco.languages.setLanguageConfiguration("javascript", {
    autoClosingPairs: [
      { open: "<", close: ">" },
      { open: "{", close: "}" },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
      { open: "`", close: "`" },
      { open: "(", close: ")" },
    ],
    surroundingPairs: [
      { open: "<", close: ">" },
      { open: "{", close: "}" },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
      { open: "`", close: "`" },
      { open: "(", close: ")" },
    ],
  });

  // JSX语言的词法解析
  monaco.languages.setMonarchTokensProvider("javascript", {
    tokenizer: {
      root: [
        [/<(\w*)(\/>)/, ["tag", "tag"]],
        [/<(\w*)/, ["tag"]],
        [/<\/(\w*)/, ["tag"]],
        [/{/, "@brackets"],
        [/}/, "@brackets"],
        [/['"]/, "string"],
      ],
    },
  });
}
