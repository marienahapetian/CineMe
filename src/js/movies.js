import { Form } from "./Form.js";
import { Pagination } from "./Pagination.js";
let html = "";
let data = [];

async function getData(params) {
	const response = await fetch("/public/data.json");
	if (!response.ok) {
		throw new Error(`Response status: ${response.statusText}`);
	}

	data = await response.json();

	return data;
}

async function displayContent(page, perPage) {
	try {
		let movies = data.movies.reverse();

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

async function displayFilters() {
	try {
		let movies = data.movies;

		let yearsOptions = [...new Set(movies.map((movie) => movie.year))].sort();

		let genres = movies.map((movie) => movie.genre);

		let genreOptions = [...new Set(genres.reduce((a, b) => [...a, ...b], []))].sort();

		let form = new Form({
			id: "filter-form",
			fields: [
				{ title: "Genre", type: "checkbox", values: genreOptions },
				{ title: "Years", type: "checkbox", values: yearsOptions },
			],
		});

		document.getElementById("filters").appendChild(form);

		console.log(yearsOptions, genreOptions);
		// genreOptions = [...new Set(movies.map((movie) => [...genreOptions, ...movie.genre]))];
	} catch (err) {
		console.log(err);
	}
}

const url = new URL(document.URL);
const perPage = 8;
const page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;
getData().then(() => {
	displayContent(page, perPage);
	displayFilters();
});
