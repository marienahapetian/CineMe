import { Pagination } from "../Pagination";
let html = "";

let toDisplay = ["title", "date"];

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

		let news = data.news.reverse();

		let pagination = new Pagination(news, perPage, page);
		pagination.create();

		news = news.slice((page - 1) * perPage, page * perPage);

		let newsDiv = document.querySelector("table tbody");

		debugger;
		news.forEach((newsSingle) => {
			let row = document.createElement("tr");
			for (const [key, value] of Object.entries(newsSingle)) {
				if (toDisplay.includes(key)) {
					let cell = document.createElement("td");
					console.log(value);
					cell.textContent = value.truncate(50);

					row.appendChild(cell);
				}
			}

			// add actions cell
			let cell = document.createElement("td");
			cell.textContent = "Edit";
			row.appendChild(cell);

			newsDiv.appendChild(row);
		});
	} catch (err) {
		console.log(err);
	}
}

const url = new URL(document.URL);
const perPage = 10;
const page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;
displayContent();
