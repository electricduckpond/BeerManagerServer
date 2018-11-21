const sql = require('mssql');
const DatabaseDetails = require('./DatabaseDetails');

exports.RunSQL = function (SQLQuery,callback){
    const connection = new sql.ConnectionPool(DatabaseDetails.DatabaseDetails);
    connection.connect().then(
        function()
        {
            var request = new sql.Request(connection);
        request.query(SQLQuery).then(
            function (records){

                //callback(records.recordsets);
                callback(records);
                

             })

             .catch(function (error){
                 callback(null,error);
                 console.log(error);
             });
            
        }
    
    )
    .catch(function (error)
    {
        console.log(error);
        callback(null,error);
    }
    );





}



