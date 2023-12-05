# 💃 The Limbo Game 🕺

## Context

Conventional development workflows _(i.e. based on branching, PRs, Code Review, manual testing, etc...)_ will often have the following drawbacks:

- slow feedback loop
- slow development workflow
- high risk of merge conflicts _(and associated waste of time + risk of breaking things during merge)_
- more silos and less collective ownership
- multitasking _(e.g. working on lower priority tasks while waiting for feedback on higher priority tasks)_

To avoid these drawbacks, we will try to use a workflow based on [Kent Beck's Limbo](https://medium.com/@kentbeck_7670/limbo-scaling-software-collaboration-afd4f00db4b):
> Limbo is live, shared programming. It balances precariously between two principles:
> - Everyone is working on (and production is executing) the same program, represented by a single abstract syntax tree.
> - No one is allowed to cause others (including users) problems.

In this workshop, we will restrict ourselves with some extreme rules _(cf. [Rules](#rules))_ and see what we can learn from that.

## Rules

1. ☝️ all developers must commit to the same branch _(i.e. **no branching** / **no PRs**)_
2. 🤝 each commit must be propagated immediately _(i.e. each commit must be pushed immediately and pulled by others)_ _(cf. [Limbo](#limbo))_
3. ⏳ all developers must use [autorevert](#autorevert) or [tcr](#tcr)
4. ✅ ci workflow should never break
5. 🤖 manual testing is forbidden _(i.e. **starting the app is not allowed, but TDD is highly encouraged 😉**)_
6. 🗑️ in case of conflict, the first commit wins _(i.e. **never fix conflicts**)_

## App requirements

- [ ] User should be able to list all recipes.
- [ ] User should be able to filter recipes by keywords.
- [ ] User should be able to add recipes to favorites.
- [ ] User should not be able to add the same recipe to favorites twice.
- [ ] User should be able to visit the details page of a recipe showing: ingredients, steps.

## Useful commands

### Running build, lint & tests

```sh
# Build all apps.
pnpm nx run-many --target=build

# Lint all apps and libs.
pnpm nx run-many --target=lint

# Test all apps and libs.
pnpm nx run-many --target=test

# Run Playwright Component testing
pnpm nx run-many --target=test-ui

# Run all targets on all projects
pnpm nx run-many --target=build,lint,test,test-ui

# Run Playwright Component testing with interactive ui
pnpm nx test-ui recipes-api --ui

# Run web app tests in watch mode
pnpm nx test whiskmate --watch

# Run recipes API tests in watch mode
pnpm nx test recipes-api --watch
```

### Limbo

This will keep pushing / pulling your changes every 5 seconds.

```sh
pnpm limbo
```

### Autorevert

With this command, once you start making changes, you have 5 minutes to commit and push your changes. Otherwise, ALL your changes will be reverted.

```sh
pnpm autorevert 5
```

### TCR

This one is handing for refactoring.
If the tests are green, it will commit and push your changes. Otherwise, it will revert your changes (except test files).

```sh
pnpm tcr <commit-message>
```
