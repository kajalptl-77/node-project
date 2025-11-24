import { query, pool } from '../utils/database.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {

    try {
        const { email, name, Password } = req.body;

        if (!email || !name || !Password) {
            return res.status(400).send({ status: false, message: "Please provide email, name, and password (they are mandatory)" });
        }

        const registerUserSP = `CALL RegisterUser(?, ?, ?);`;
        const [results] = await query(registerUserSP, [email, name, Password]);

        if (!results || results.length === 0 || !results[0]) {
            return res.status(500).send({ status: false, message: 'No data returned from the stored procedure' });
        }

        const spResponse = results[0];

        if (spResponse.status === 0) {
            return res.status(400).send({ status: false, message: spResponse.message });
        }

        return res.status(200).send({ status: true, userId: spResponse.userId, message: spResponse.message });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, Password } = req.body;

    try {
        const selectUserSP = 'CALL LoginUser(?)';
        const results = await query(selectUserSP, [email]);

        const users = results[0];

        if (!users || users.length === 0) {
            return res.status(401).json({ error: 'Invalid email/contact number or password' });
        }

        const user = users[0];

        if (user.user_password !== Password) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const accessToken = jwt.sign({ userId: user.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        const refreshToken = jwt.sign({ userId: user.user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        const insertOrUpdateTokenSP = 'CALL InsertRefreshToken(?, ?, ?)';
        const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await query(insertOrUpdateTokenSP, [user.user_id, refreshToken, expiryDate]);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            accessToken,
            message: 'Login successful',
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// export const addUser = async (req, res) => {
//     try {
//         const {  name } = req.body;

//         if (!name ) {
//             return res.status(400).send({ status: false, message: "Please provide email, name, and password (they are mandatory)" });
//         }

//         const add = 'insert into tbl_user (user_name) values (?);'

//         return res.status(200).send({ status: true, userId: spResponse.userId, message: spResponse.message });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).send({ status: false, message: err.message });
//     }
// };



export const addUser = async (req, res) => {
    try {
        const { name } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).json({ 
                status: false, 
                message: "Please provide a name (it is mandatory)" 
            });
        }

        // SQL query to insert user into tbl_user
        const add = `INSERT INTO tbl_user (user_name) VALUES (?);`;

        // Execute the query
        const result = await query(add, [name]);

        // Check if insertion was successful
        if (result.affectedRows === 0) {
            return res.status(500).json({
                status: false,
                message: "User not inserted due to database error"
            });
        }

        // Return success response
        return res.status(201).json({ 
            status: true, 
            message: "User added successfully", 
            userId: result.insertId 
        });

    } catch (err) {
        console.error("❌ Database Error:", err);
        return res.status(500).json({ 
            status: false, 
            message: "Internal Server Error",
            error: err.message
        });
    }
};
