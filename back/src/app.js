const cors = require("cors");
const express = require("express");
const { swaggerUi, specs } = require('./swagger/swagger');
const {beachRouter} = require("./routes/beachRouter");
require('./db/index');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(beachRouter);

app.get('/',(req,res)=>{
    res.render('.');
});

export { app }; 