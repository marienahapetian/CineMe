import { Form } from "./Form.js";
import { User } from "./User.js";

export class LoginForm extends Form {
	constructor(params) {
		super(params);
	}

	async submit() {
		super.submit();

		let username = this.fields.username.value;
		let u = new User();
		let user = await u.find(username);
		if (user && user.password == this.fields.password.value) {
			document.cookie = "sessionId=ezjerdhdzejshd; max-age=60*60; path=/"; // keep logged in for 1 hour
			window.location.href = "/dashboard/";
		} else {
			alert("username or password is wrong");
		}
	}
}
