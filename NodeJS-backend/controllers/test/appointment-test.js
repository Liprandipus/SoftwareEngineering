// Two common testing libraries chai and sinon,
// Chai helps you check if your code behaves correctly,
// sinon test functions and how they are used
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const db = require('../../db');
const appointmentController = require('../appointmentController');

describe('Appointment Controller', () => {
    let req, res, stub;

    beforeEach(() => {
        req = {
            body: {
                service: 'Haircut - 15€',
                date: '05/05/2025',
                time: '10:00:00',
                barber: 'John',
                email: 'test@example.gr'
            }
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis()
        };
        stub = sinon.stub(db, 'query');
    });

    afterEach(() => {
        stub.restore();
    });

    it('should return 400 if any field is missing', async () => {
        req.body = {
            service: 'Haircut - 15€',
            date: '2025-05-05',
            time: '10:00:00',
            barber: 'John',
            client: 'test'
        };

        await appointmentController.bookAppointment(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'All fields are required' })).to.be.true;
    });

    it('should return 400 if barber is already booked', async () => {
        const expectedMessage = `Barber ${req.body.barber} is already booked at ${req.body.time} on ${req.body.date}!`;

        req.body = {
            service: 'Haircut - 15€',
            date: '2025-05-05',
            time: '10:00:00',
            barber: 'John',
            email: 'test@example.com',
            client: 'test'
        };

        // Simulating with these specific fields
        stub.onFirstCall().yields(null, [{
            id: 10,
            service: 'Haircut - 15€',
            date: '2025-05-05',
            time: '10:00:00',
            barber: 'John',
            email: 'test@example.com',
            client: 'test'
        }]);

        await appointmentController.bookAppointment(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith(sinon.match({ message: expectedMessage }))).to.be.true;
    });


    it('should return 201 if appointment is booked successfully', async () => {
        stub.onFirstCall().yields(null, []);
        stub.onSecondCall().yields(null, { insertId: 1 });

        req.body = {
            service: 'Haircut - 15€',
            date: '2025-05-05',
            time: '10:00:00',
            barber: 'John',
            email: 'test@example.com',
            client: 'test'
        };

        await appointmentController.bookAppointment(req, res);

        // Debugging assertion
        console.log('res.json called with:', res.json.args);

        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith(sinon.match({ message: 'Appointment booked successfully!'}))).to.be.true;
    });

    it('should return 500 on database query error', async () => {
        stub.onFirstCall().yields(new Error('Database query error'));

        await appointmentController.bookAppointment(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith(sinon.match({ error: 'Database query error' }))).to.be.true;
    });

    it('should return 500 on insert appointment error', async () => {
        stub.onFirstCall().yields(null, []);
        stub.onSecondCall().yields(new Error('Insert appointment error'));

        await appointmentController.bookAppointment(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith(sinon.match({ error: 'Insert appointment error' }))).to.be.true;
    });
});