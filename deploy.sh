//deploy.sh
#!/usr/bin/env sh
set -e
yarn build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/eztitplus/work_list.git master:gh-pages
cd -
