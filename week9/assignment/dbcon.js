const mysql = require('mysql');
module.exports.pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs290_fletchri',
    password        : '3552',
    database        : 'cs290_fletchri'
});