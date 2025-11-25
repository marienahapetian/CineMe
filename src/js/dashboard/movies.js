import { Pagination } from "../Pagination";
let html = "";

let toDisplay = ["name", "year"];

String.prototype.urlfriendly = function () {
	return this.toLowerCase().replace(" ", "-");
};

String.prototype.truncate = function (n) {
	return this.length > n ? this.slice(0, n - 1) + "..." : this;
};

async function displayContent() {
	try {
		const response = await fetch("/public/data.json");
		if (!response.ok) {
			throw new Error(`Response status: ${response.statusText}`);
		}

		const data = await response.json();

		let movies = data.movies;

		let pagination = new Pagination(movies, perPage, page);
		pagination.create();

		let titlesDiv = document.querySelector("table thead");
		let row = document.createElement("tr");

		toDisplay.forEach((key) => {
			let cell = document.createElement("td");
			cell.textContent = key.charAt(0).toUpperCase() + key.slice(1, key.length);

			row.appendChild(cell);
		});

		let cell = document.createElement("td");
		cell.textContent = "Actions";
		row.appendChild(cell);
		titlesDiv.appendChild(row);

		movies = movies.slice((page - 1) * perPage, page * perPage);

		let moviesDiv = document.querySelector("table tbody");

		console.log(movies);

		movies.forEach((movie) => {
			let row = document.createElement("tr");
			for (const [key, value] of Object.entries(movie)) {
				if (toDisplay.includes(key)) {
					let cell = document.createElement("td");
					cell.textContent = value;

					row.appendChild(cell);
				}
			}

			// add actions cell
			let cell = document.createElement("td");
			cell.textContent = "Edit";
			row.appendChild(cell);

			moviesDiv.appendChild(row);
		});
	} catch (err) {
		console.log(err);
	}
}

const url = new URL(document.URL);
const perPage = 10;
const page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;
displayContent();
