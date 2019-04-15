# Mocha test runner

to run
`$ mocha tests/`
or
`$ mocha tests/**/*.*`

! don't use arrow functions when 
using the test's context (it)


### Chai is an assertion library

- it uses `expect` and a slightly different syntax

https://devhints.io/chai


### SinonJS provides test spies, stubs, mocks

spy:
- tracks fake/existing functions exec
- functions run as-is (we're just "spying" on them)
- tells us how many times function has been called, the arguments passed when it was called, etc
- useful for callbacks

sinon.spy() arguments

![](screens/2019-04-14-14-49-57.png)

stub:
- replaces functions
- we replace actual function
- more control by returning whatever we want or have function work in a way that suites our test scenario
- useful for: 
	- slow, difficult tests e.g. **HTTP, DB calls**
	- triggering diff. outcomes for a piece of code, e.g. what happens if it passes/or if an error is thrown

mock:
- fake functions 
- pre-programmed behavior and expectation
- we can speficy how we want something to work
and use `mock.verify()` to make sure it works