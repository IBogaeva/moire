#!/usr/bin/env sh

#остановить публикацию при ошибках
set -e

#сборка приложения
npm run build

#переход в каталог сборки
cd dist

#инициализация репозитория м загрузка кода в GitHub
git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/IBogaeva/moire-app.git master:gh-pages

cd -
