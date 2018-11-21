const express = require('express');
const router = express.Router();

const dbconn = require('../../databaseconnection');


router.get('/',function(req, res){

    dbconn.RunSQL('SELECT * FROM UserLogins', function (data,error){
        if (error){
            //res.writeHead(500, 'Internal Error', {'Content-Type': "text/html"});
            res.write('<html><head><title>500</title></head><body> 500: internal error. Details:' + error + '</body></html>');

        }
        else{
            //res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(data));
            
        }
        res.end();



    })
    

});







router.post('/',(req, res, next) => {
    const product = {
        name: req.name,
        price: req.price
    }

    res.status(200).json({
        message: 'Handling POST requests to /products'
    })
})


router.patch('/:ProductCode', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product'
    })



})

router.delete('/:ProductCode', (req, res, next) => {
    res.status(200).json({
        message: 'deleted product'
    })



})


//router.get('/:ProductCode', (req, res, next) => {
//    const Code = req.params.ProductCode;
//
  //  if(Code === 'special') {
    //    res.status(200).json({
      //      message:'egg', Code: Code
        //})
        
 //   }
  //  else{
  //      res.status(200).json({
   //         message: 'not egg'
   //     });
//    }


//})


module.exports = router;