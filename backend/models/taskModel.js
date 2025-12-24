const pool = require('../config/db');

const Task = {
    create: async (userId, title, description, status) => {
        const query = 'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(query, [userId, title, description, status || 'pending']);
        return { id: result.insertId, user_id: userId, title, description, status: status || 'pending' };
    },

    findAllByUserId: async (userId) => {
        const query = 'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC';
        const [rows] = await pool.execute(query, [userId]);
        return rows;
    },

    update: async (id, userId, taskData) => {
        const { title, description, status } = taskData;
        const query = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?';
        await pool.execute(query, [title, description, status, id, userId]);
        return { id, user_id: userId, ...taskData };
    },

    delete: async (id, userId) => {
        const query = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';
        const [result] = await pool.execute(query, [id, userId]);
        return result.affectedRows > 0;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM tasks WHERE id = ?';
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }
};

module.exports = Task;
