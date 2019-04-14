const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

// needed for VSCode debugging
// const mocha = require('mocha');
// const describe = mocha.describe;
// const it = mocha.it;

// import controller to test
const app = require('../../controllers/app.controller');

// 1. use SPY to create dummy function
describe('index', () => {
	it('should return index page', () => {
		let req = {};
		// mock res.send
		let res = {
			// this mock doesn't help us
			// send: function() {}

			// use a spy to get a dummy function
			send: sinon.spy()
		}

		app.index(req, res);	// inspect res to see methods on spy
		
		// 1a. expect that out function `res.send` is called once
		expect(res.send.calledOnce).to.be.true;	
		// 1b. expect that we get an argument `Hey world` on firstCall
		expect(res.send.firstCall.args[0]).to.equal("Hey world!");
	})
});

// 2. use SPY to wrap already existing functions to track their execution
describe('User', () => {
	describe('addUser', () => {
		it('should add a user', () => {

			// use spy to "hijack" app.addUser
			sinon.spy(app, "addUser");
			app.addUser("Lenny DaLobster");

			expect(app.addUser.calledOnce).to.be.true;
		})
	})
})