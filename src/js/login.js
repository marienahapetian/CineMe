import { LoginForm } from "./LoginForm.js";
import { SignupForm } from "./SignupForm.js";

let loginForm = new LoginForm({
	id: "filter-form",
	displayLabel: false,
	fields: [
		{ title: "Username", type: "text" },
		{ title: "Password", type: "password" },
		{ title: "Login", type: "submit" },
	],
});

loginForm.className = "flex flex-col gap-20";

let signupForm = new SignupForm({
	id: "filter-form",
	displayLabel: false,
	fields: [
		{ title: "Name", type: "text" },
		{ title: "Lastname", type: "text" },
		{ title: "Email", type: "email" },
		{ title: "Password", type: "password" },
		{ title: "Repeat Password", type: "password" },
		{ title: "Register", type: "submit" },
	],
});
signupForm.className = "flex flex-col gap-20";

document.getElementById("login").appendChild(loginForm);
document.getElementById("register").appendChild(signupForm);
