let html = "";

async function displayContent(page, perPage) {
	try {
		const response = await fetch("/public/data.json");
		if (!response.ok) {
			throw new Error(`Response status: ${response.statusText}`);
		}

		const data = await response.json();

		let movies = data.movies;

		let pagination = new Pagination(movies, perPage, page);
		pagination.create();

		let moviesToShow = movies.slice((page - 1) * perPage, page * perPage);

		let list = document.getElementById("category-items");

		moviesToShow.forEach((movie) => {
			let movieDiv = document.createElement("div");
			movieDiv.innerHTML = `<a href="single-movie.html?id=${movie.id}" class="image-container"><img src="${movie.image}"><span>${movie.name}</span><i>${movie.year}</i></a>`;
			list.appendChild(movieDiv);
		});
	} catch (err) {
		console.log(err);
	}
}

const url = new URL(document.URL);
const perPage = 8;
const page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;
displayContent(page, perPage);
