*Core WebAPI Projesi =>
DepartmentsController
EmployeesController
Program.cs
appsettings.json

*REACT PROJESİ =>
Departments.js
Employee.js
Home.js
App.js
Variables.js

#Create React App
### `npm start`
### `npm test`
### `npm run 
### `npm run eject`
### `npm run build`
npm i react-router-dom

MSSQL TABLOLARI=>

CREATE TABLE [dbo].[Department](
	[DepartmentId] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentName] [nvarchar](500) NULL
) ON [PRIMARY]
GO


CREATE TABLE [dbo].[Employee](
	[EmployeeId] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeName] [nvarchar](500) NULL,
	[Department] [varchar](50) NULL,
	[DateOfJoining] [datetime] NULL,
	[PhotoFileName] [nvarchar](500) NULL
) ON [PRIMARY]
GO


