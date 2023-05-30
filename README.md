to initialized the project
npm init

to install typescript as Development dependency, since will run in JS not in TS
npm add -D typescript

npm add express

npm add mongoose

to initialized the typescript config file
tsc --init

update root directory from tsconfig.json
"rootDir": "./src"

update out directory for JS from tsconfig.json
"outDir": "./dist", 

npm add dotenv

git init 

git add  .

git commit -m"message"

git branch -M main

git remote add origin https://github.com/mohammedazizul/university-management-auth-service.git

git push -u origin main

setup mongoDB database connection in server.ts

connect remotely with mongoDB

npm i --save-dev @types/express

npm add ts-node-dev --dev

update package.json with - 
"start": "ts-node-dev --respawn --transpile-only src/server.ts",

npm start

npm add cors

npm i --save-dev @types/cors

