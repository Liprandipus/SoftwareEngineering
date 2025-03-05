const db = require('../db');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid email' });
            }

            const user = results[0];


            if (password !== user.password) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            res.status(200).json({ message: 'Login successful', user });
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
