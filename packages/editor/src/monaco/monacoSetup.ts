export function configureMonaco(monaco) {
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
