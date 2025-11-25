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

		let series = data.shows;

		let pagination = new Pagination(series, perPage, page);
		pagination.create();

		series = series.slice((page - 1) * perPage, page * perPage);

		let seriesDiv = document.querySelector("table tbody");

		console.log(series);

		series.forEach((serie) => {
			let row = document.createElement("tr");
			for (const [key, value] of Object.entries(serie)) {
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

			seriesDiv.appendChild(row);
		});
	} catch (err) {
		console.log(err);
	}
}

const url = new URL(document.URL);
const perPage = 10;
const page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;
displayContent();
