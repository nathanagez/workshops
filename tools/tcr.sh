#!/usr/bin/env bash

set -e

if [ $# -lt 1 ]; then
    COMMAND=$(basename $0)
    echo "Usage:"
    echo "  $COMMAND <message>"
    echo "  $COMMAND --fixup <commit>"
    exit 1
fi

if [ "$1" == "--fixup" ]; then
  shift
  COMMIT_FIXUP_SHA="$1"
else
  COMMIT_MESSAGE="$1"
fi

function test() {
  nx run-many -t test,test-ui
}

function revert() {
  git diff --name-only  | grep -v '.spec.ts' | xargs git checkout
  git clean -df
}

function commit() {
  git add .

  if [ -n "$COMMIT_FIXUP_SHA" ]; then
    git commit --fixup "$COMMIT_FIXUP_SHA"
  else
    git commit -m "$COMMIT_MESSAGE"
  fi
}

test && commit || revert
