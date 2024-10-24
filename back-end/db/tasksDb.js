const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'testing-system',
});

connection.connect(err => {
    if (err) {
        console.error('Error ocurred while connecting to db: ', err.stack);
        return ;
    }
    
    console.log('Connected to groups db via id: ', connection.threadId);
});

module.exports = connection;
