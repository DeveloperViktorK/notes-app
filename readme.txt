
GET		/api/v1/notes			Все заметки пользователя	Пагинация notes?page=1&size=5
POST	/api/v1/notes			Добавить заметку
Get		/api/v1/notes/id		Просмотр заметки
Put		/api/v1/notes/id		Редактирование заметки
Delete	/api/v1/notes/id    	Удаление заметки
POST	/api/v1/auth/register	Регистрация пользователя
POST	/api/v1/auth/login		Получение токена
GET		/api/v1/auth/logout		---

config/default.json
{
  "PORT": "3000",
  "DB_NAME": "notes-app",
  "HOST": "localhost",
  "MY_SQL_PORT": "3306",
  "USER_NAME": "root",
  "PASSWORD": "Your_password",
  "SECRET_STR": "My_secret_string",
  "JWT_SECRET": "My_secret_JWT",
  "SALT": "My_SALT"
}
