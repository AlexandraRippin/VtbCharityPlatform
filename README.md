# ВТБ благотворительная платформа.

## Версия Python

Рекомендуется Python 3.10 или выше.

## Создание виртуального окружения

Создайте виртуальное окружение:
```bash
python -m venv venv
```
*На Linux/Mac может быть `python3` вместо `python`*

Активируйте виртуальное окружение:

**Linux/Mac:**
```bash
source venv/bin/activate
```

**Windows:**
```cmd
venv\Scripts\activate
```

## Установка зависимостей

```bash
pip install -r requirements.txt
```

## Команды запуска

1. Перейдите в директорию проекта:
```bash
cd VtbCharityPlatform
```

2. Примените миграции:
```bash
python manage.py migrate
```
*На Linux/Mac может быть `python3` вместо `python`*

3. Создайте суперпользователя (для админки):
```bash
python manage.py createsuperuser
```
*На Linux/Mac может быть `python3` вместо `python`*

4. Запустите сервер:
```bash
python manage.py runserver
```
*На Linux/Mac может быть `python3` вместо `python`*

5. Откройте в браузере:
- Главная: http://127.0.0.1:8000/
- Админка: http://127.0.0.1:8000/admin/
- Статистика: http://127.0.0.1:8000/stats

## Настройки

Переменные окружения не используются. Все настройки в файле `VtbCharityPlatform/VtbCharityPlatform/settings.py`.

Используется SQLite база данных (`db.sqlite3`).

## Учётные данные для входа

Для входа в админ-панель нужно создать суперпользователя командой `python manage.py createsuperuser`.

Публичная часть сайта не требует авторизации.

## Структура проекта

```
VtbCharityPlatform/
├── VtbCharityPlatform/
│   ├── Charity/              # Приложение
│   │   ├── models.py        # Модели Project, Donation
│   │   ├── views.py         # Представления
│   │   ├── forms.py         # Формы
│   │   └── admin.py         # Админка
│   ├── VtbCharityPlatform/  # Настройки Django
│   │   ├── settings.py
│   │   └── urls.py
│   ├── templates/           # HTML шаблоны
│   ├── static/              # CSS, JS, изображения
│   ├── db.sqlite3           # База данных
│   └── manage.py
└── requirements.txt
```
