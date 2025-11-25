import { Form } from "./Form.js";
import { Pagination } from "./Pagination.js";
let html = "";

async function displayContent() {
	try {
		const response = await fetch("/public/data.json");
		if (!response.ok) {
			throw new Error(`Response status: ${response.statusText}`);
		}

		const data = await response.json();

		let actors = data.actors;

		let professions = actors.map((actor) => actor.profession.split(" "));
		let professionOptions = [...new Set(professions.reduce((a, b) => [...a, ...b], []))].sort();

		let genderOptions = [...new Set(actors.map((actor) => actor.gender))].sort();

		let form = new Form({
			id: "filter-form",
			fields: [
				{ title: "Profession", type: "checkbox", values: professionOptions },
				{ title: "Gender", type: "radio", values: genderOptions },
			],
		});

		document.getElementById("filters").appendChild(form);

		let pagination = new Pagination(actors, perPage, page);
		pagination.create();

		let actorsToShow = actors.slice((page - 1) * perPage, page * perPage);

		actorsToShow.forEach((actor) => {
			html += `<a href="single-prof.html?id=${actor.id}" class="image-container"><img src="${actor.image}" /><span>${actor.name}</span></a>`;
		});

		document.getElementById("category-items").innerHTML = html;
	} catch (err) {
		console.log(err);
	}
}

const url = new URL(document.URL);
const perPage = 8;
const page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;
displayContent();
