//mongoDb schema:
const mongoose = require('mongoose');
const validator = require('email-validator'); //used as email validator:

var employeeSchema = new mongoose.Schema({
    fullName : {
        type:String,
        required:true
    },
    email: {
        type:String
    },
    mobile: {
        type:String
    },
    city: {
        type:String
    }
});


employeeSchema.path('email').validate((val) => {
    return validator.validate(val);
},"invalid email");



mongoose.model('Employee',employeeSchema);

//here first parameter is as modelname ('Employee) and  the second parameter is as a veriable 'employeeSchema'