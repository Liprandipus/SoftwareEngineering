const db = require('../db');

exports.bookAppointment = async (req, res) => {
    const { service, date, time, barber } = req.body;

    if (!service || !date || !time || !barber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the barber is already booked at that time
        const checkQuery = 'SELECT * FROM Appointments WHERE barber = ? AND date = ? AND time = ?';
        db.query(checkQuery, [barber, date, time], async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ error: err.message });
            }

            if (results.length > 0) {
                // Format the date as "DD-MM-YYYY" for better view
                const formattedDate = new Date(date).toLocaleDateString('en-GB');
                return res.status(400).json({ message: `Barber ${barber} is already booked at ${time} on ${formattedDate}!` });
            }

            const insertQuery = 'INSERT INTO Appointments (service, date, time, barber) VALUES (?, ?, ?, ?)';
            db.query(insertQuery, [service, date, time, barber], (err, result) => {
                if (err) {
                    console.error('Insert appointment error:', err);
                    return res.status(500).json({ error: err.message });
                }

                res.status(201).json({ message: 'Appointment booked successfully!', redirect: 'http://localhost:8080/welcome' });
            });
        });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
