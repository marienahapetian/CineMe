let html = "";

async function displayContent(page, perPage) {
	try {
		const response = await fetch("/public/data.json");
		if (!response.ok) {
			throw new Error(`Response status: ${response.statusText}`);
		}

		const data = await response.json();

		let shows = data.shows;

		let pagination = new Pagination(shows, perPage, page);
		pagination.create();

		let showsToShow = shows.slice((page - 1) * perPage, page * perPage);

		let list = document.getElementById("category-items");

		showsToShow.forEach((show) => {
			let showDiv = document.createElement("div");
			showDiv.innerHTML = `<a href="single-show.html?id=${show.id}" class="image-container"><img src="${show.image}"><span>${show.name}</span><i>${show.year}</i></a>`;
			list.appendChild(showDiv);
		});
	} catch (err) {
		console.log(err);
	}
}

const url = new URL(document.URL);
const perPage = 8;
const page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;
displayContent(page, perPage);
