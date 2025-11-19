let html = "";

String.prototype.urlfriendly = function () {
	return this.toLowerCase().replace(" ", "-");
};
async function displayContent() {
	try {
		const response = await fetch("/public/data.json");
		if (!response.ok) {
			throw new Error(`Response status: ${response.statusText}`);
		}

		const data = await response.json();

		let professions = data.professions;

		professions.forEach((profession) => {
			html += `<a href="profs.html?profession=${profession.name.urlfriendly()}"  class="image-container"><img src="${profession.image}" /><span>${profession.name}</span></a>`;
		});

		document.getElementById("category-items").innerHTML = html;
	} catch (err) {
		console.log(err);
	}
}

displayContent();
