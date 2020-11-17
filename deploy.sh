#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
yarn build

# cd 到构建输出的目录下 
cd dist

git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:kanboo/e-commerce2.git master:gh-pages

cd -