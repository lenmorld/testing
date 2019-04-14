class User {
	constructor(name) {
		this.name = name
	}

	printInfo() {
		return this.name;
	}

	isLoggedIn(user){
		// best auth ever!
		return user.name === "Lenny";
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

		return u;
	},

	secret: (req, res) => {
		if (req.user.isLoggedIn()) {
			return res.send("Secret is 1234");
		}
		res.send("Access denied. Log in required");
	}
}