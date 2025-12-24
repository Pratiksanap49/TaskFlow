const pool = require('../config/db');

const User = {
    create: async (name, email, password) => {
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const [result] = await pool.execute(query, [name, email, password]);
        return result.insertId;
    },

    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await pool.execute(query, [email]);
        return rows[0];
    },

    findById: async (id) => {
        const query = 'SELECT id, name, email, created_at FROM users WHERE id = ?';
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }
};

module.exports = User;
