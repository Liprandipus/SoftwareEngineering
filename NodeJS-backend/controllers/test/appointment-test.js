const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const Appointment = require("../../Sequelize-ORM/models/appointment");
const appointmentController = require('../appointmentController');

describe('Appointment Controller', () => {
    let req, res, findOneStub, createStub;

    beforeEach(() => {
        req = {
            body: {
                service: 'Haircut - 15€',
                date: '2025-05-05',
                time: '10:00:00',
                barber: 'John',
                email: 'test@example.gr',
                client: 'test' 
            }
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis()
        };
        findOneStub = sinon.stub(Appointment, 'findOne');
        createStub = sinon.stub(Appointment, 'create');
    });

    afterEach(() => {
        findOneStub.restore();
        createStub.restore();
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

        console.log(res.json.getCall(0).args[0]); // Debugging

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith(sinon.match({ message: 'All fields are required' }))).to.be.true;
    });

    it('should return 400 if barber is already booked', async () => {
      
        req.body = {
            service: 'Haircut - 15€',
            date: '2025-05-19',
            time: '10:00:00',
            barber: 'John',
            email: 'test@example.com',
            client: 'test'
        };
    
        
        const existingAppointment = {
            service: 'Haircut - 15€',
            date: '2025-05-19',
            time: '10:00:00',
            barber: 'John',
            email: 'test@example.com',
            client: 'test'
        };
    
       
        findOneStub.resolves(existingAppointment);
    
        
        await appointmentController.bookAppointment(req, res);
    
        
        sinon.assert.calledWithExactly(findOneStub, {
            where: { barber: req.body.barber, date: req.body.date, time: req.body.time }
        });
    
       
        expect(res.status).to.have.been.calledOnceWithExactly(400);
    
        
        const expectedMessage = `Barber ${req.body.barber} is already booked at ${req.body.time} on ${req.body.date}!`;
        expect(res.json).to.have.been.calledOnceWithExactly({ message: expectedMessage });
    });
    

    it('should return 201 if appointment is booked successfully', async () => {
        findOneStub.resolves(null);

        createStub.resolves({
            id: 1,
            service: 'Haircut - 15€',
            date: '2025-05-05',
            time: '10:00:00',
            barber: 'John',
            email: 'test@example.com',
            client: 'test'
        });

        await appointmentController.bookAppointment(req, res);

        console.log(res.json.getCall(0).args[0]); // Debugging

        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith(sinon.match({ message: 'Appointment booked successfully!' }))).to.be.true;
    });

    it('should return 500 on database query error', async () => {
        findOneStub.rejects(new Error('Database query error'));

        await appointmentController.bookAppointment(req, res);

        console.log(res.json.getCall(0).args[0]); // Debugging

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith(sinon.match({ error: 'Database query error' }))).to.be.true;
    });
});
