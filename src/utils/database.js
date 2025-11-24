
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Password@0157',
    database: 'demodb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the database');
        connection.release();
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
})();


const query = async (sql, values) => {
    try {
        const [results] = await pool.query(sql, values);
        return results;
    } catch (err) {
        throw err;
    }
};

export { query, pool };
