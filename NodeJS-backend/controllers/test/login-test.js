// Two common testing libraries chai and sinon,
// Chai helps you check if your code behaves correctly,
// sinon test functions and how they are used
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const db = require('../../db');
const loginController = require('../authController');

describe('Login Controller', () => {
    let req, res, stub;

    beforeEach(() => {
        req = { body: { email: 'test@example.gr', password: '12345' } };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis()
        };
        stub = sinon.stub(db, 'query');
    });

    afterEach(() => {
        stub.restore();
    });

    it('should return 401 if email is invalid', async () => {
        stub.yields(null, []);

        await loginController.login(req, res);

        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledWith({ message: 'Invalid email' })).to.be.true;
    });

    it('should return 401 if password is invalid', async () => {
        stub.yields(null, [{ email: 'test@example.gr', password: '123456' }]);

        await loginController.login(req, res);

        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledWith({ message: 'Invalid password' })).to.be.true;
    });

    it('should return 200 if login is successful', async () => {
        stub.yields(null, [{ email: 'test@example.gr', password: '12345' }]);

        await loginController.login(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(sinon.match({ message: 'Login successful' }))).to.be.true;
    });

    it('should return 500 on database error', async () => {
        stub.yields(new Error('Database error'));

        await loginController.login(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith(sinon.match({ error: 'Database error' }))).to.be.true;
    });
});
