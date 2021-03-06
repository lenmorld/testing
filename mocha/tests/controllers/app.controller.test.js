const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require("chai-as-promised"));

// needed for VSCode debugging
// const mocha = require('mocha');
// const describe = mocha.describe;
// const it = mocha.it;
// const done = mocha.done;

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


// 3. use STUB
describe('secret', () => {
	it('should send secret when user logged in', () => {

		const user = app.addUser("Lenny DaLobster");

		// stub isLoggedIn function, return TRUE always
		const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(true); // <- TRUE

		// mock req, and spy on res
		let req = {
			user: user
		}

		// 😎
		expect(req.user.isLoggedIn()).to.be.true;

		let res = {
			send: sinon.spy()
		}

		app.secret(req, res);

		expect(res.send.calledOnce).to.be.true;
		expect(res.send.firstCall.args[0]).to.equal("Secret is 1234");

		// assert stub is logged in at least once
		console.log(isLoggedInStub.callCount);
		expect(isLoggedInStub.callCount).to.be.greaterThan(0);
	})

	it('should send access-denied message when user not logged in', () => {

		const user = app.addUser("Lenny DaLobster");

		// stub isLoggedIn function, return TRUE always
		const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(false); // <- FALSE

		// mock req, and spy on res
		let req = {
			user: user
		}

		let res = {
			send: sinon.spy()
		}

		app.secret(req, res);

		expect(res.send.calledOnce).to.be.true;
		expect(res.send.firstCall.args[0]).to.equal("Access denied. Log in required");

		// assert stub is called at least once
		console.log(isLoggedInStub.callCount);
		expect(isLoggedInStub.callCount).to.be.greaterThan(0);
	})
})


// 4. use MOCK
describe('secret', () => {
	it('should send secret when user logged in', () => {

		const user = app.addUser("Lenny DaLobster");

		// stub isLoggedIn function, return TRUE always
		const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(true); // <- TRUE

		// mock req, and spy on res
		let req = {
			user: user
		}

		let res = {
			send: function() {}		// NOTE here that we are using empty function, instead of a spy
		}

		// mock res
		const mock = sinon.mock(res);

		// build how we expect it to work
		mock.expects('send').once().withExactArgs("Secret is 1234");

		app.secret(req, res);

		expect(isLoggedInStub.calledOnce).to.be.true;
		
		// verify mock works as expected
		mock.verify();
	})
})


// 5. Async test
// describe.only('doAsync', () => {		// only run this test
describe('doAsync', () => {
	it('should return Yes! if true is passed', (done) => {		// DONT FORGET TO PASS done arg here
		app.doAsync(true, function (returnVal) {
			expect(returnVal).to.equal('Yes!');
			done();
		});
	})

	it('should return No! if false is passed', (done) => {		// DONT FORGET TO PASS done arg here
		app.doAsync(false, function (returnVal) {
			expect(returnVal).to.equal('No!');
			done();
		});
	})

	// THIS TEST SHOULD FAIL!
	it('should fail', (done) => {
		app.doAsync(false, function (returnVal) {
			expect(returnVal).to.equal('BLAAAH!');
			done();
		});
	})
})


// 6. Async promises test
// describe.only('AsyncTest', () => {		// only run this test
describe('doAsyncPromise', () => {
	it('should resolve Yes! if true is passed', () => {
		return expect(app.doAsyncPromise(true)).to.eventually.equal("Yes!")
	});

	it('should resolve No! if false is passed', () => {
		return expect(app.doAsyncPromise(false)).to.eventually.equal("No!")
	});

	// THIS TEST SHOULD FAIL
	it('should fail', () => {
		return expect(app.doAsyncPromise(true)).to.eventually.equal("BLAAH!")
	});


})