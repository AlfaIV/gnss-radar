# Frontend репозиторий проекта информационной системы "Мониторинга системы сигналов ГНСС"

## Команда
* __Название__: Вкладыши
* __frontenend dev__: [AlfaIV](https://github.com/AlfaIv)

## Полезные ссылки

* [Ссылка на репозиторий бэкенда проекта](https://github.com/Gokert/gnss-radar)
* [Ссылка на дизайн UI](https://pixso.net/app/editor/KlCBZl5kvYozzxsx0V57Qw?icon_type=1&page-id=14%3A177 Приглашаем вас присоединиться к Pixso Файл дизайна  "ПИШ")

## Запуск проекта

Поднимаем докер контейнер и запускаем.

```bash
	docker build -t gnss-radar .
	docker run -p 1000:80 gnss-radar
```

В поисковой строке браузера вводим:

```
  localhost:1000
```

Для подключения переменных среды

```bash
source env.sh
```
Для публикации Docker образа

```bash
docker build -t gnss-radar .
docker tag gnss-radar:latest alfaiv/gnss-radar:latest
docker push alfaiv/gnss-radar
```


## Описание проекта



query listGnss {
  listGnss(filter: { Coordinates: { x: "0", y: "0", z: "0" } }){
    items {
      Id
    }
  }
}

query listTask{
  listTask(filter:{}){
    items{
      id
    }
  }
}


