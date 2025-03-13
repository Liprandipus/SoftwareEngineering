const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const regRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/authRoutes');
const port = process.env.PORT || 3000;
require('dotenv').config();

const app = express();
app.use(express.json()); // Parsing JSON data
app.use(bodyParser.json());
app.use(cors()); // Using CORS to communicate with our frontend

// Routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
