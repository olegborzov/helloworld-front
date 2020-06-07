# HelloWorld front
Фронт-часть приложения Helloworld с возможностью регистрации, авторизации и отправки Email.

### Автор
Борзов Олег<br>
http://olegborzov.ru/

## Структура
- **src/app/core**
    - **interceptors**
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
Запуск контейнеров
```
$ docker-compose -f docker-compose.dev.yml up -d
$ docker-compose -f docker-compose.prod.yml up -d
```
