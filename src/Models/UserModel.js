// UserModel.js

// const query = require('./db'); // Assuming you have a db.js file for database connection

// const UserModel = {
//     async checkAttendance(deviceId) {
//         const checkQuery = 'SELECT * FROM attendance WHERE deviceid = ? AND DATE(intime) = CURDATE()';
//         return await query(checkQuery, [deviceId]);
//     },

//     async recordIntime(deviceId, istTimestamp) {
//         const insertQuery = 'INSERT INTO attendance (deviceid, intime) VALUES (?, ?)';
//         return await query(insertQuery, [deviceId, istTimestamp]);
//     },

//     async recordOutime(deviceId, istTimestamp) {
//         const updateQuery = 'UPDATE attendance SET outime = ? WHERE deviceid = ? AND DATE(intime) = CURDATE() AND outime IS NULL';
//         return await query(updateQuery, [istTimestamp, deviceId]);
//     }
// };

// module.exports = UserModel;
