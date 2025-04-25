const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const port = process.env.PORT;
const app = express();

//Database
dbConnection();

//Cors
app.use(cors());

//Public directory

app.use(express.static('public'));

//body parsed
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})