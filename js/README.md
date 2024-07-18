# js & Node.js

This is the folder includes some functions and personal projects in javascript and Node.js

## js在当前环境中进行运行`test.js`

```js
void (async () => {
    //相关内容
    let UT = new utils();
    console.log(await UT.calElevators(900000))
})();
```
## introduction under the file

- dateFormat.js: regular functions about calculations and formatting of date
  - relevant library: moment.js,luxon.js
- eventListener.js: the implement of eventListener
- promise.js: the implement of promise
- grammar.js: the difference among  es5, es6, and es7
- system.js: regular using of system
- stateMachine.ts: the implement demo of state machine. visualization url: https://stately.ai/viz 

## popular framework

- [Egg](https://www.eggjs.org/)
- [Express](https://expressjs.com/)
- [Next.js](https://nextjs.org/)
- [Koa](https://koajs.com/)

## popular library

- [Moment](https://www.npmjs.com/package/moment): A JavaScript date library for parsing, validating, manipulating, and formatting dates.
- [Luxon](https://www.npmjs.com/package/luxon): latest data format library
- [Got](https://www.npmjs.com/package/got): Human-friendly and powerful HTTP request library for Node.js
- [Exceljs](https://www.npmjs.com/package/exceljs): Read, manipulate and write spreadsheet data and styles to XLSX and JSON.
- [mongoose](https://www.npmjs.com/package/mongoose): Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports Node.js and Deno (alpha).
- [sequelize](https://www.npmjs.com/package/sequelize): an easy-to-use and promise-based Node.js ORM tool for Postgres, MySQL, MariaDB, SQLite, DB2, Microsoft SQL Server, and Snowflake
- [lodash](https://lodash.com/): A modern JavaScript utility library delivering modularity, performance & extras.
- [agenda](https://github.com/agenda/agenda): A light-weight job scheduling library for Node.js
- [Bull](https://github.com/OptimalBits/bull): The fastest, most reliable, Redis-based queue for Node.
Carefully written for rock solid stability and atomicity.

### scaffold

- [backend_nodejs_scaffold](https://github.com/oneWalker/backend_nodejs_scaffold): including the scaffold implement in gRPC, http and graphQL on express

- [core-event-producer](https://github.com/oneWalker/core-event-producer.git): A library to define and use AWS SNS and AWS SQS more convenient 


## other links
  - [eggPluginDemo](https://github.com/oneWalker/egg-pluginDemo)
  - [egg-cos(published one)](https://github.com/oneWalker/egg-cos)
  - [BDMS(in class100.com,based on Sequelzie,eggjs,private)](https://github.com/oneWalker/BDMS_Back)
  - [TicketSystem(based on Express)](https://github.com/oneWalker/TicketSystem)
