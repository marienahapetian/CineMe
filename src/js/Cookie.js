export class Cookie {
	static get(name) {
		let value = `; ${document.cookie}`;
		let parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(";").shift();
	}
}
