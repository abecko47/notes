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
- http://localhost:3000 - React App (frontend)
- http://localhost:4000 - NestJs App (backend)
- http://localhost:4000/apiref - Swagger