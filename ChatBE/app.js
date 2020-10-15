const express = require('express');
const router = require('./routers/index');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(require('cors')());

app.use('/', router)

const errorHandlers = require('./handles/errorHandles');
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);

if(process.env.ENV === "DEVELOPMENT") {
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(errorHandlers.productionErrors);
}

module.exports = app;