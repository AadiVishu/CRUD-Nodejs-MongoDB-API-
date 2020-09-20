
require('./models/db');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const employeeController = require('./controller/employeeController');
const app = express();

//configuring  middleware:
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); //it will converting all the request data in json formate:

//configuring the views of the applications: 
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',expressHandlebars({
    extname:'hbs',
    defaultLayout:'mainLayout',
    layoutsDir:__dirname + '/views/layouts/'
}));
app.set('view engine','hbs');//handle bars done:

//configuring the route for home route:
app.get('/',(req,res)=>{
    res.render('./layouts/index'); //first landing page on the port : 5000;
});


app.listen(5000,() => {
    console.log("server is running at port : 5000");
});

app.use('/employee',employeeController);