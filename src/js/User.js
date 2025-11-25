import { Cookie } from "./Cookie";

export class User {
	constructor() {}

	getUser() {
		return this.user;
	}

	setUser(user) {
		this.user = user;
	}

	static getById(id) {
		return id;
	}

	static userLoggedIn() {
		return Cookie.get("sessionId");
	}

	async find(username) {
		let response = await fetch("/public/users.json");
		let data = await response.json();

		let users = data.users;

		return users.find((user) => user.username == username);
	}
}
