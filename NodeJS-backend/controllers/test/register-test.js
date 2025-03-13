const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const User = require("../../Sequelize-ORM/models/user");
const registerController = require('../regController');

describe('Register Controller', () => {
    let req, res, findOneStub, createStub;

    beforeEach(() => {
        req = { body: { email: 'test@example.gr', password: '12345' } };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis()
        };
        findOneStub = sinon.stub(User, 'findOne');
        createStub = sinon.stub(User, 'create');
    });

    afterEach(() => {
        findOneStub.restore();
        createStub.restore();
    });

    it('should return 400 if email already exists', async () => {
        findOneStub.resolves({ email: 'test@example.gr' });

        await registerController.register(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Email already exists' })).to.be.true;
    });

    it('should return 201 if user is registered successfully', async () => {
        findOneStub.resolves(null);
        createStub.resolves({ id: 1, email: 'test@example.gr', password: '12345' });

        await registerController.register(req, res);

        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith(sinon.match({ message: 'User registered successfully!' }))).to.be.true;
    });

    it('should return 500 on database query error', async () => {
        findOneStub.rejects(new Error('Database query error'));

        await registerController.register(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith(sinon.match({ error: 'Database query error' }))).to.be.true;
    });

    it('should return 500 on insert user error', async () => {
        findOneStub.resolves(null);
        createStub.rejects(new Error('Insert user error'));

        await registerController.register(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith(sinon.match({ error: 'Insert user error' }))).to.be.true;
    });
});
