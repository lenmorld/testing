const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

// needed for VSCode debugging
// const mocha = require('mocha');
// const describe = mocha.describe;
// const it = mocha.it;

// import controller to test
const pages = require('../../controllers/app.controller');

describe('index', () => {
	it('should return index page', () => {
		let req = {};
		// mock res.send
		let res = {
			// send: function() {}

			// 1. use a spy to get a dummy function
			send: sinon.spy()
		}

		pages.index(req, res);	// inspect res to see methods on spy
		
		// 1. SPY - and make assertions on the spy
		// 1a. expect that out function `res.send` is called once
		expect(res.send.calledOnce).to.be.true;	
		// 1b. expect that we get an argument `Hey world` on firstCall
		expect(res.send.firstCall.args[0]).to.equal("Hey world!");
	})
})