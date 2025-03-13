const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const User = require("../../Sequelize-ORM/models/user");
const loginController = require('../authController');

describe('Login Controller', () => {
    let req, res, stub;

    beforeEach(() => {
        req = { body: { email: 'test@example.gr', password: '12345' } };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis()
        };

        stub = sinon.stub(User, 'findOne');
    });

    afterEach(() => {
        stub.restore();
    });

    it('should return 401 if email is invalid', async () => {

        stub.resolves(null);
        await loginController.login(req, res);

        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledWith({ message: 'Invalid email' })).to.be.true;
    });

    it('should return 401 if password is invalid', async () => {

        stub.resolves({ email: 'test@example.gr', password: '123456' });
        await loginController.login(req, res);

        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledWith({ message: 'Invalid password' })).to.be.true;
    });

    it('should return 200 if login is successful', async () => {

        stub.resolves({ email: 'test@example.gr', password: '12345' });
        await loginController.login(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(sinon.match({ message: 'Login successful' }))).to.be.true;
    });

    it('should return 500 on database error', async () => {
        stub.rejects(new Error('Database error'));
        await loginController.login(req, res);
    
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith(sinon.match({ message: 'Internal server error' }))).to.be.true;  
    });
});
