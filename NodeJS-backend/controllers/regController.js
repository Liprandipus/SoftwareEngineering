const User = require("../Sequelize-ORM/models/user");

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = await User.create({ email, password });
        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (error) {
        console.error('Registration error:', error);

        
        if (error.message === 'Database query error') {
            return res.status(500).json({ error: 'Database query error' });
        } else if (error.message === 'Insert user error') {
            return res.status(500).json({ error: 'Insert user error' });
        }

       
        res.status(500).json({ error: 'Internal server error' });
    }
};