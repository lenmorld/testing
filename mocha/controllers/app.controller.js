class User {
	constructor(name) {
		this.name = name
	}

	printInfo() {
		return this.name;
	}
}

const users = [];

/* usage:

const u = new User("Lenny");
u.printInfo();
// 'Lenny'
*/

module.exports = {
	index: (req, res) => {
		res.send("Hey world!");
	},

	// e.g. POST /users/ calls this 
	addUser: (name) => {
		const u = new User(name);
		users.push(u);
	}
}