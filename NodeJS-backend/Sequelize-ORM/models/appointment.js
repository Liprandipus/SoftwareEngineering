const {DataTypes} = require("sequelize");
const sequelize = require("../../db");

const Appointment = sequelize.define("Appointment", {
        id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
        service: {type: DataTypes.STRING, allowNull: false},
        date: {type: DataTypes.DATEONLY, allowNull: false},
        time: {type: DataTypes.TIME, allowNull: false},
        barber: {type: DataTypes.STRING, allowNull: false},
        client: {type: DataTypes.STRING, allowNull: false}
    },
    {
        timestamps: false
    });

module.exports = Appointment;
