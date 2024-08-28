import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'senai',
    database : 'presidentesdb'
});

export default pool;