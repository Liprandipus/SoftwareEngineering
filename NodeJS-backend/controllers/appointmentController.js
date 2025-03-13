const Appointment = require("../Sequelize-ORM/models/appointment");

exports.bookAppointment = async (req, res) => {
    try {
        const { service, date, time, barber, email } = req.body;

        
        if (!service || !date || !time || !barber || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

      
        if (typeof email !== "string" || !email.includes("@")) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const client = email.split("@")[0];

      
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

       
        const existingAppointment = await Appointment.findOne({
            where: { barber, date, time },
        });

        if (existingAppointment) {
            const formattedDate = parsedDate.toLocaleDateString("en-GB");
            return res.status(400).json({
                message: `Barber ${barber} is already booked at ${time} on ${formattedDate}!`,
            });
        }

       
        await Appointment.create({
            service,
            date,
            time,
            barber,
            client,
        });

        return res.status(201).json({ message: "Appointment booked successfully!" });
    } catch (error) {
        console.error("Booking error:", error);

        
        return res.status(500).json({ message: "Database query error", error: error.message });
    }
};
