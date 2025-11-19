async function addFooter() {
	const response = await fetch("/parts/footer.html");

	if (!response.ok) {
		throw new Error(`Response status: ${response.statusText}`);
	}

	const html = await response.text();

	document.querySelector("footer").innerHTML = html;
}

addFooter();
