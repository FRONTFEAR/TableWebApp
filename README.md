# TableWebApp
Подготовка
1) Для начала работы необходимо создать локальный сервер Microsoft SQL Server (новая установка SQL server), компонент (ядро СУБД)
2) Затем необходимо поключится к серверу ("." в названии) и выполнить следующий запрос 
"
create Database ByteDB

create table dbo.Byte(
ByteId int identity(1,1),
ByteBinNumber varchar(8),
ByteDecNumber varchar(3))
 
insert into dbo.Byte values
("1010","10"),
("101000","40"),
("111100","60")

"
 
3)Запустите WebTableApi 
4)Откройте папку tableapp в редакторе кода и запустите с помощью команды "npm start".
