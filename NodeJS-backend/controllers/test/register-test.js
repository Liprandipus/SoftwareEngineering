// Two common testing libraries chai and sinon,
// Chai helps you check if your code behaves correctly,
// sinon test functions and how they are used
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const db = require('../../db');
const registerController = require('../regController');
describe('Register Controller', () => {
    let req, res, stub;

    beforeEach(() => {
        req = { body: { email: 'user1@gmail.com', password: 'user1' } };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis()
        };
        stub = sinon.stub(db, 'query');
    });

    afterEach(() => {
        stub.restore();
    });

    it('should return 400 if email already exists', async () => {
        stub.onFirstCall().yields(null, [{ email: 'user1@gmail.com' }]);

        await registerController.register(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Email already exists' })).to.be.true;
    });

    it('should return 201 if user is registered successfully', async () => {
        stub.onFirstCall().yields(null, []);
        stub.onSecondCall().yields(null, { insertId: 1 });

        await registerController.register(req, res);

        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith(sinon.match({ message: 'User registered successfully!' }))).to.be.true;
    });

    it('should return 500 on database query error', async () => {
        stub.onFirstCall().yields(new Error('Database query error'));

        await registerController.register(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith(sinon.match({ error: 'Database query error' }))).to.be.true;
    });

    it('should return 500 on insert user error', async () => {
        stub.onFirstCall().yields(null, []);
        stub.onSecondCall().yields(new Error('Insert user error'));

        await registerController.register(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith(sinon.match({ error: 'Insert user error' }))).to.be.true;
    });
});
