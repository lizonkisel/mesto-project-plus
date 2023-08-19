# Mesto project backend. API Mesto

Work of my backend (with common learning frontend) you can test [here](https://lizonkisel.students.nomoreparties.sbs/)

## Description

Backend of small social network for sharing pictures and impressions. Study Project in [Yandex.Practicum](https://practicum.yandex.ru/)

Frontend for this project you can find [here](https://github.com/yandex-praktikum/web-plus-pm2-deploy/tree/master/frontend)

## Stack

```js 
"dependencies": {
    "bcryptjs": "^2.4.3",
    "celebrate": "^15.0.1",
    "express": "^4.18.1",
    "express-winston": "^4.2.0",
    "mongoose": "^6.5.0",
    "winston": "^3.8.2"
    ...
  },

"devDependencies": {
    "typescript": "^4.7.4"
    "ts-node": "^10.9.1",
    ...
  }
```

And MongoDB v4.4.20

## Install and start-up

This project will works correctly with **node v16.16.0**

1. Copy this project to you machine, using `git clone`

2. Go to the folder with the project and do `npm ci` to set up all needed dependencies

3. Do `npm run dev` to test the project. For testing you should send requests to localhost:3000.  

4. Also you can run the project by using other scripts (see package.json)


## Improvement plans

* Add is API's description by using Swagger
