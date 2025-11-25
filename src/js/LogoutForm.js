import { Form } from "./Form.js";
import { User } from "./User.js";

export class LogoutForm extends Form {
	constructor(params) {
		super(params);
	}

	async submit() {
		super.submit();

		document.cookie = "sessionId=null; max-age=0; path=/"; // keep logged in for 1 hour
		window.location.href = "/login.html";
	}
}
