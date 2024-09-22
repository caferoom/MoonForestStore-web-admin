module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/vue3-recommended', // 使用更严格的 Vue 规则集
    'eslint:recommended',
    'prettier', // 使用 eslint-config-prettier 插件
  ],
  parserOptions: {
    parser: 'babel-eslint', // 使用 babel-eslint 作为解析器
    extraFileExtensions: ['.vue'], // 允许解析 .vue 文件
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': ["error", "always"],
  },
  plugin: ["vue"]
};