import {defineConfig} from 'bumpp';

export default defineConfig({
  all: false,
  commit: "chore: release v%s",
  preid: 'beta',
  tag: true,
  push: false,
  files: ["package.json", "packages/**/package.json", "containers/**/package.json"]
})