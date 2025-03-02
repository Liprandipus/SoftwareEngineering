const db = require('../db');
exports.register = async (req, res) => {
    const { email, password } = req.body;
    console.log('Request body:', req.body); 
  
    try {
      const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
      db.query(checkUserQuery, [email], async (err, results) => {
        if (err) {
          console.error('Database query error:', err); 
          return res.status(500).json({ error: err.message });
        }
  
        if (results.length > 0) {
          console.log('Email already exists:', email); 
          return res.status(400).json({ message: 'Email already exists' });
        }
  
        const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(insertUserQuery, [email, password], (err, results) => {
          if (err) {
            console.error('Insert user error:', err); 
            return res.status(500).json({ error: err.message });
          }
  
          console.log('User registered successfully:', results); 
          res.status(201).json({ message: 'User registered successfully' });
        });
      });
    } catch (error) {
      console.error('Registration error:', error); 
      res.status(500).json({ message: 'Internal server error' });
    }
  };