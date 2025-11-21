async function addFooter() {
	const response = await fetch("/parts/footer.html");

	if (!response.ok) {
		throw new Error(`Response status: ${response.statusText}`);
	}

	const html = await response.text();

	document.querySelector("footer").innerHTML = html;
}

async function addHeader() {
	const response = await fetch("/parts/header.html");

	if (!response.ok) {
		throw new Error(`Response status: ${response.statusText}`);
	}

	const html = await response.text();

	document.querySelector("header").innerHTML = html;

	document.querySelectorAll("#primary-nav a").forEach((element) => {
		debugger;
		if (element.href.replace(base, "") == pathname) {
			element.classList.add("current");
		} else {
			element.classList.remove("current");
		}
	});
}

let currentPage = document.URL;
let base = window.location.origin;
let pathname = window.location.pathname;

addFooter();
addHeader();
