// test/bookAppointment.test.js
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const db = require('../../db');
const appointmentController = require('../appointmentController');  // Υποθέτοντας ότι το αρχείο σου είναι στον φάκελο controllers

describe('Appointment Controller', () => {
  let req, res, stub;

  beforeEach(() => {
    req = { body: { service: 'Haircut', date: '2025-03-04', time: '10:00', barber: 'John Doe' } };
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
    req.body = {};  // Κενό σώμα αίτησης

    await appointmentController.bookAppointment(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: 'All fields are required' })).to.be.true;
  });

  it('should return 400 if barber is already booked', async () => {
    const formattedDate = new Date(req.body.date).toLocaleDateString('en-GB');
    const expectedMessage = `Barber ${req.body.barber} is already booked at ${req.body.time} on ${formattedDate}!`;
    
    stub.onFirstCall().yields(null, [{ barber: 'John Doe', date: '2025-03-04', time: '10:00' }]);

    await appointmentController.bookAppointment(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: expectedMessage })).to.be.true;
  });

  it('should return 201 if appointment is booked successfully', async () => {
    stub.onFirstCall().yields(null, []);
    stub.onSecondCall().yields(null, { insertId: 1 });

    await appointmentController.bookAppointment(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(sinon.match({ message: 'Appointment booked successfully!', redirect: 'http://localhost:8080/welcome' }))).to.be.true;
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
