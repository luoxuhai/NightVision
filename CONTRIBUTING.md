# Contribution Guidelines

Thanks for your help! We welcome all contributors.

## Project structure

- [`src`](/src) js source code
- [`ios`](/ios) ios source code

## Install dependencies

```bash
npm install
or
yarn
```

## run

```bash
npm run ios
```

## Write Commit Message

Before creating a pull request, please check that your commit complies with the commit conventions used in this repository.

When you create a commit, follow the convention: `category(scope or module): message`, where `category` is one of:

- `feat`: a new feature
- `fix`: fix bugs
- `refactor`: refactoring (code changes that neither fix bugs nor add new features)
- `perf`: code changes to improve performance
- `docs`: change existing docs or create new ones
- `build`: changes affecting the build system or external dependencies (example scope: rollup, npm)
- `test`: add missing tests or correct existing ones
- `style`: changes that do not affect the meaning of the code (whitespace, formatting, missing semicolons, etc.)
- `chore`: A change to the repository that does not meet any of the above

If you're interested in a detailed specification, you can visit [Conventional Commits](https://www.conventionalcommits.org) or check out the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/ CONTRIBUTING.md#-commit-message-guidelines).

## Command Introduction

> See: <https://reactnative.dev/docs/environment-setup>

- `npm run ios` one way to run your app. You can also run it directly from within Xcode.
- `npm run start` starts Metro Bundler.
