# HelloWorld frontend
Фронт-часть приложения Helloworld с возможностью регистрации, авторизации и отправки Email.

### Автор
Борзов Олег<br>
http://olegborzov.ru/

## Структура
- **.ci-cd** - sh-скрипты для деплоя проекта на сервер
    - curl_tg.sh - отправка уведомлений о процессе деплоя в Telegram
    - deploy.sh - запуск деплоя на сервере после билда и прогона тестов в Github Actions
    - rollback.sh - откат деплоя на предыдущую версию
- **src/app/core/interceptors** - перехватчики запросов
- **src/app/pages** - модули и компоненты приложения
- **src/app/shared** - разделяемый функционал для модулей и компонентов
    - **interfaces**
    - **models**
    - **services**
    - **utils**

## Команды для запуска и настройки приложения 
Запуск локального сервера:
```
$ npm start
```

## Docker
Запуск билда образа:
```
$ docker build --build-arg BRAHCH_NAME=dev -t hw_front .
```

Запуск контейнера с последней версией образа:
```
export HW_ENV=dev
export HW_DOCKER_REGISTRY=docker.helloworld.ru  # меняем на свой
$ docker-compose -f docker-compose.yml up -d 
```
