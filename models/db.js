const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/EmployeeDB";

//connect method of mongoose:
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true},
    //these all are for handling deprications warnings:
    (err) => {
    if(!err) {
        console.log("mongoDB database connected!");
    }
    else {
        console.log("Database Error : " + err);
    }
});


//include the employee model:
require('./employee.model');