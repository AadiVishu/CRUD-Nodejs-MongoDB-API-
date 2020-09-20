const express = require('express');
const mongoose = require('mongoose');
//include the model class:
const Employee = mongoose.model('Employee');//called the model which is on 'employee.model.js files:
const router = express.Router();



router.get('/',(req,res) => {
    res.render('employee/addOrEdit.hbs',{
        viewTitle : "Insert Employee"
    });
});

//hadle the post request:
router.post('/saveEmployee' ,(req,res) => {
    //just check the if this post is for the creation of the record or the updation:
    if(req.body._id == '') {
        insertRecord(req,res);
    }
    else {
        updateRecord(req,res);
    }
});

//functionality to insert the records:
function insertRecord(req,res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;

    //checking for the validation:
    if(employee.fullName == '' || employee.email == '' || employee.city == '' || employee.mobile == '') {
        res.render('employee/addOrEdit',({
            viewTitle: 'Insert Employee',
            error: 'Enter all the deatails',
            employee: req.body
        }))
        return;
    }
    //after inserting the data we have to save aslo:
    employee.save((err,doc) => {
        if(!err) {
           res.redirect('/employee/list');
        }
        else {
            if(err.name == "ValidationError") {  //'ValidationError' is pre-defined:
                handleValidationError(err,req.body);
                res.render('employee/addOrEdit',({
                    viewTitle:'Insert Employee',
                    employee: req.body,
                }))
            }
            //if error is there:
            console.log("error while inserting data : " + err);
        }
    });
}

//create a route for displaying all the user:
router.get('/list',(req,res) => {
    Employee.find((err,docs) => {
        if(!err){
            res.render('employee/list',{
                list: docs
            });
        }
    }).lean();  //lean property is used to handle and fetch the query:
});

//create a route for the upadte and fetch the data from database into input field:
router.get('/:id',(req,res)=>{
    Employee.findById(req.params.id,(err,doc)=> {
        //check for the error:
        if(!err) {
            res.render('employee/addOrEdit',({
                viewTitle:"Update Employee",
                employee:doc
            }))
        }
    }).lean();
});


//create a route for delete the particular record:
router.get('/delete/:id',(req,res)=> {
    Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err) {
            res.redirect('/employee/list');
        }
        else {
            console.log("An error occured during the delete operation : " + err );
        }
    });
});


//for handling the error ,creating the function:
function handleValidationError(err,body) {
    for(field in err.errors) {
        switch(err.errors[field].path)
        {
           case 'fullName':
               body['fullNameError'] = err.errors[field].message;
               break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}


//creationg a function for update record:
function updateRecord(req,res) {
    Employee.findOneAndUpdate({_id:req.body._id },req.body,{new:true},(err,doc)=>{
        // if no erorr is there:
        if(!err) {
            res.redirect('/employee/list');
        }
        else {
            //if no error:
            if(err.name == "ValidationError") {
                handleValidationError(err,req.body);
                res.render('employee/addOrEdit',({
                    viewTitle:"Update Employee",
                    employee:req.body
                }))
            }
            else {
                console.log("error occured in updating the records : " + err);
            }
        }
    })
}








//for exporting:
module.exports = router;
