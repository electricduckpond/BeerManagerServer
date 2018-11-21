const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const dbconn = require('../../databaseconnection');
const bodyParser = require("body-parser");
const sql = require('mssql');

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("UserPassword", salt);
 
router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(bodyParser.json());

router.post('/createuser', function(req,res){

    let createkeys = Object.keys(req.body);
    var email = req.body[createkeys[0]];
    var password = req.body[createkeys[1]];

    if(CheckEmail(email) && CheckPassword(password)){

        bcrypt.hash(password, 10, function(error, hash) {
            if (error){
                return res.status(500).json({
                    error: error
                });
            }
            else{
            dbconn.RunSQL("INSERT INTO UserLogins(UserEmail, HashedPW) VALUES ('" + email + "', '" + hash + "')", function(result, error){
                if(error){
                    console.log("Error");
                }
                else{
                    res.send("Success");
                    res.end();

                    console.log("Success");
                }

                
            });

        
            
            }

        });


    }
    else{
        console.log("invalidEmail or password");
        res.send("Invalid"); 
        res.end();
    }


    

   



    



        




});

function CheckPassword(PasswordToCheck){

    if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(PasswordToCheck)){

        return (true)
    }
    else{
        return (false)
    }


}


function CheckEmail(EmailToCheck){

     if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(EmailToCheck))
     {
         return (true)
        }
     else{
         return (false)
     }

}

router.post('/checksignup', function(req,res){

    let keys = Object.keys(req.body);
    var Email = req.body[keys[0]];
    var Password = req.body[keys[1]];
    var ReturnValue = new String;

    dbconn.RunSQL("SELECT UserEmail, HashedPW FROM UserLogins WHERE UserEmail = '" + Email + "'", function (data, error){
        if (error){
            //res.writeHead(500, 'Internal Error', {'Content-Type': "text/html"});

            console.log(Email);
            console.log(Password);
            res.write('<html><head><title>500</title></head><body> 500: internal error. Details:' + error + '</body></html>');

           

        
        }
        else{

            if(data.rowsAffected >= 1){
                console.log("User Exists");
                ReturnValue = "Exists";
                
                  res.send(ReturnValue);
                
            }
            else{
                console.log(data.rowsAffected);
                console.log("User Does Not Exist");
                
                res.send(ReturnValue);
            }


            // if(Exists){
            //     bcrypt.compare(Password, hash, function(error, res){

            //         if (res){



            //         }
            //         else{

            //         }

            //     });

            // }

            
        }
        res.end();


    });


});


function ComparePasswords(InputPassword, HashPassword, callback){
    bcrypt.compare(InputPassword, HashPassword,function (error, Match) {
        if (error){
            return callback(error);
        }
        else{
            return callback(null, Match);
        }

    });
    

}




router.post('/check', function(req,res){

    let keys = Object.keys(req.body);
    var Email = req.body[keys[0]];
    var Password = req.body[keys[1]];
    var Exists = new Boolean(false);

    dbconn.RunSQL("SELECT UserEmail, HashedPW FROM UserLogins WHERE UserEmail = '" + Email + "'", function (data, error){
        if (error){
            //res.writeHead(500, 'Internal Error', {'Content-Type': "text/html"});
            res.write('<html><head><title>500</title></head><body> 500: internal error. Details:' + error + '</body></html>');

           

        
        }
        else{
            //res.writeH(200, {'Content-Type': 'application/json'});
            //res.write(JSON.stringify(req.body));

            if(data.rowsAffected >= 1){
                console.log("User Exists");
                Exists = true;
                //res.send("Exists");
            }
            else{
                console.log("User Does Not Exist");
                //res.send("NOExists");
            }

            if(Exists){

                HashedPw = data.recordset[0].HashedPW;
                ComparePasswords(Password, HashedPw, function(error, Match){
                    if(error){
                        console.log(error);
                    }
                    else if(!Match){
                        res.send("WrongPass");
                        console.log("WrongPass");
                    }
                    else if(Match){
                        res.send("CorrectPass");
                        console.log("CorrectPass");

                    }
                    res.end();
                    

                });


                
                // bcrypt.compare(Password, HashedPw, function(error, BcryptRes){

                //     if (BcryptRes){
                //         res.send("CorrectPass");



                //     }
                //     else{
                //         res.send("WrongPass")

                //     }

                // });


                //console.log(HashedPw);
             
                

            }

          
            
        }
        //res.end();
       
 



    });


});
    







module.exports = router;