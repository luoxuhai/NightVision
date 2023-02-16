# 贡献指南

感谢您的帮助！我们欢迎所有贡献者。

## 项目结构

- [`src`](/src) js 源代码
- [`ios`](/ios) ios 源代码

## 安装依赖

```bash
npm install
or
yarn
```

## 运行

```bash
npm run ios
```

## 编写 Commit Message

在创建拉取请求之前，请检查您的提交是否符合此存储库中使用的提交约定。

当您创建提交时，请遵守约定：`category(scope or module): message`，其中 `category` 是以下之一：

- `feat`：一项新的功能特性
- `fix`：修复 bug
- `refactor`：重构（既不修复bug也不增加新功能的代码更改）
- `perf`：提高性能的代码更改
- `docs`：更改现有文档或创建新文档
- `build`：影响构建系统或外部依赖项的更改（示例范围: rollup、npm）
- `test`： 添加缺失的测试或更正现有的测试
- `style`：不会影响代码含义的更改（空格，格式，缺少分号等）
- `chore`：不符合上述任何一项的对存储库的更改

如果您对详细规范感兴趣，可以访问 [Conventional Commits](https://www.conventionalcommits.org) 或查看 [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)。

## 命令介绍

> 参考: <https://reactnative.dev/docs/environment-setup>

- `npm run ios` 运行您的应用程序的一种方式。您也可以直接从 Xcode 中运行它
- `npm run start` 启动 Metro Bundler
