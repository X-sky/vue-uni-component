import {defineConfig} from 'bumpp';

export default defineConfig({
  all: false,
  commit: false,
  preid: 'beta',
  tag: false,
  push: false,
  files: ["package.json", "packages/**/package.json", "containers/**/package.json"]
})