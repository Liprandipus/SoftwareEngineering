const sequelize = require("./db");
const Appointment = require("./models/appointment");
const User = require("./models/user");

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("Database synced successfully!");
    } catch (error) {
        console.error("Error syncing database:", error);
    } finally {
        await sequelize.close();
    }
})();
