# Notes app
Note is a simple app, where registered user can:
- Manage (Add, Remove, Edit) Notes
- Assign Notes to Notebooks
- Assign tags to both Notes and Notebooks
- Search for his Notes and Notebooks

All routes are protected and are accessible via JWT authorization.

# Technologies
App contains of two projects: `web` and `api`.
- web:
  - React
  - MUI
  - axios
- api:
  - NestJS
  - PostgreSQL
  - Prisma ORM
  - Swagger UI
  - Jest
# Installation
After cloning the repository you need to do couple of simple steps to setup backend and frontend.
Also you need to setup database in Docker container. 
## Database
Run database in container:
```
docker-compose up -d
```
## Backend
cd into `api`
```
  cd api
```
Install node_modules
```
  npm i
```
Create .env file
```
touch .env
```
Then, put following content into .env:
```
DATABASE_URL="postgres://root:root@localhost:5432/postgres"
JWT_SECRET="3IPK"
```
Migrate and populate database
```
  npx prisma migrate dev
```
Run dev server
```
npm run start:dev
```
## Frontend
cd into `web`
```
  cd web
```
Install node_modules
```
  npm i
```
Run dev frontend
```
npm run start
```
# URLs
- http://localhost:3000 - React App (frontend). Default user with mocked data has `default` username and `qwerty12345` password.
- http://localhost:4000 - NestJs App (backend)
- http://localhost:4000/apiref - Swagger
# Screenshots
<img width="256" alt="Screenshot 2023-11-13 at 10 55 03 AM" src="https://github.com/abecko47/notes/assets/10388830/f0ed643a-8016-40ac-b9da-e62b16bdb371">
<img width="1797" alt="Screenshot 2023-11-13 at 10 53 14 AM" src="https://github.com/abecko47/notes/assets/10388830/9cd7241d-ab04-4396-9295-a3082c193fb9">
<img width="1797" alt="Screenshot 2023-11-13 at 10 53 35 AM" src="https://github.com/abecko47/notes/assets/10388830/5a1ffd5b-edf3-43a0-9230-3e384f1bc699">
<img width="1794" alt="Screenshot 2023-11-13 at 10 53 51 AM" src="https://github.com/abecko47/notes/assets/10388830/652037b3-c71a-4ea2-a0d9-f231c90859c0">
