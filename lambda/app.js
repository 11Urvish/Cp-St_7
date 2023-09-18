require("dotenv").config();

const express = require("express");
const app = express();
const caslMiddleware = require("./middleware/caslMiddleware");
const defineAbilityFor = require("./ability");

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`App is listening on ${port}`) });

const cors = require("cors");
app.use(cors());

const ServerlessHttp = require("serverless-http");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const database = require("./database");
database.connect();

app.get('/', (req, res) => res.send('Hello world!'));
app.use(caslMiddleware);

app.get('/lambda', (req, res) =>  {

    if(req.ability.can('read', 'lambda')) {
        return res.send('Hello Lambda world!');
    } else {
        return res.status(403).send({ message: 'Not authorized' });
    }
});

const routes = require("./routes");
routes(app);

// ====================================================================================================================================
// Swagger
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Node JS API Project for Restaurant API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3000/"
            },
            {
                url : "https://0opxpo6j22.execute-api.ap-south-1.amazonaws.com/Prod/"
            }
        ]
    },
    apis: [
        './app.js',
        './swagger/*.yaml',
    ]
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

exports.handler = ServerlessHttp(app);