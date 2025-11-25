async function addSidebar() {
	const response = await fetch("/dashboard/parts/sidebar.html");

	if (!response.ok) {
		throw new Error(`Response status: ${response.statusText}`);
	}

	const html = await response.text();

	document.querySelector("aside").innerHTML = html;

	document.querySelectorAll("aside a").forEach((element) => {
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
debugger;

addSidebar();
