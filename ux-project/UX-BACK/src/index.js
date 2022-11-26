const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;


const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
//routes
app.use(require('./routes/index.js'))
//app
app.listen(port);
console.log('** SERVER READY **');
console.log('Server listening on port: ', port );