// assert comes with NodeJS
const assert = require('assert');

this.name = "lenny";

describe('smoke test pass', () => {
	it('checks equality', () => {
		assert.equal(true, true);
	})
});

// describe('smoke test fail', () => {
// 	it('checks equality', () => {
// 		assert.equal(true, false);
// 	})
// });

// using regular functions
describe('my suite', function() {
	it('my test', function() {
		// should set the timeout of this test to 1000 ms
		// 'this' is bound to the it function
		console.log("context of this: ", this.name);
		this.timeout(1000);
		assert.ok(true);
	});
});


// using arrow functions - DOESNT WORK
describe('my suite', () => {
	it('my test', () => {
		// should set the timeout of this test to 1000 ms; instead will fail, since `this` is bound to outside
		console.log("context of this: ", this);
		this.timeout(1000);
		assert.ok(true);
	});
});