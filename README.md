to initialized the project
```
npm init
```
to install typescript as Development dependency, since will run in JS not in TS
```
npm add -D typescript
npm add express
npm add mongoose
```
to initialized the typescript config file
```
tsc --init
```
update root directory from tsconfig.json
```
"rootDir": "./src"
```
update out directory for JS from tsconfig.json
```
"outDir": "./dist", 
```
to add dotenv
```
npm add dotenv
```
to initialize git
```
git init 
git add  .
git commit -m"message"
git branch -M main
git remote add origin https://github.com/mohammedazizul/university-management-auth-service.git
git push -u origin main
```
setup mongoDB database connection in server.ts

connect remotely with mongoDB

npm i --save-dev @types/express

npm add ts-node-dev --dev

update package.json with - 
"start": "ts-node-dev --respawn --transpile-only src/server.ts",

npm start

npm add cors

npm i --save-dev @types/cors

eslint >> prettier >> husky >> lint-stage

REF: https://blog.logrocket.com/linting-typescript-eslint-prettier/

update tsconfig.json
```
"include": ["src"], // which files to compile
"exclude": ["node_modules"], // which files to skip
```

to add eslint
```
npm add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

create .eslintrc file in root and add followings - 
```
// .eslintrc
{
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 13,
      "sourceType": "module"
    },
    "plugins": ["@typescript-eslint"],
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  
    "rules": {
      "@typescript-eslint/no-unused-vars": "error",
      // to enforce using type for object type definitions, can be type or interface 
      "@typescript-eslint/consistent-type-definitions": ["error", "type"]
    },
  
    "env": {
      "browser": true,
      "es2021": true
    }
}
```

update in package.json
```
"lint:check": "eslint --ext .js,.ts .",
```

create and write into .eslintignore
```
dist
node_modules
.env
```

update in package.json
```
"lint:check": "eslint --ignore-path .eslintignore --ext .js,.ts .",
```

update in package.json
```
"lint:fix": "eslint --fix",
```

to add prettier
```
npm add -D prettier
```

create and write into .prettierrc
```
{
    "semi": false,
    "singleQuote": true, 
    "arrowParens": "avoid"
}
```

to use prettier to fix one file
```
npx prettier --write src/index.ts
```

update in package.json
```
"prettier:check": "npx prettier --write .",
```

update in package.json
"prettier:check": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",

update VS Code settings if required


to install package to remove conflict in between eslint and prettier
npm add -D eslint-config-prettier


https://typicode.github.io/husky/getting-started.html

npm install husky --dev

npm husky install

to create husky hook
npm husky add .husky/pre-commit "npm test"

git add .husky/pre-commit

update in package.json
"lint-prettier": "npm lint:check && npm prettier:check",

npm install --save-dev lint-staged

create .eslintrc file in root and add followings - 
```
  "no-console": "error",
  "no-undef": "error",
  "no-unused-expressions": "error",
  "no-unreachable": "error",
```

.vscode folder and settings.json added to config vscode

to toggle between development & production command

set NODE_ENV=production && npm start

console.log(app.get('env'))

or update in .env 

NODE_ENV=development


