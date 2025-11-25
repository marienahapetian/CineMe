import { User } from "../User";

if (!User.userLoggedIn()) {
	window.location.href = "/login.html";
}
