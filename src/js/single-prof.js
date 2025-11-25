import { Lightbox } from "./Lightbox.js";
let html = "";

function age(actor) {
	var birthdate = new Date(actor.birth); // Feb 1, 2011
	var today = new Date(); // now

	var elapsed = new Date(today.getTime() - birthdate.getTime());

	console.log(elapsed);

	return Math.abs(elapsed.getUTCFullYear() - 1970);
}

async function displayContent(id) {
	try {
		const response = await fetch("/public/data.json");
		if (!response.ok) {
			throw new Error(`Response status: ${response.statusText}`);
		}

		const data = await response.json();

		let actor = data.actors.find((actor) => actor.id == id);

		document.getElementById("profession").textContent = actor.profession;
		document.getElementById("name").textContent = actor.name;
		document.getElementById("birthdate").textContent = "Born: " + actor.birth + " ( Age: " + age(actor) + " yo )";

		document.querySelector(".main-img img").src = actor.image;

		actor.thumbs.forEach((thumb) => {
			let singleImage = document.createElement("span");
			singleImage.className = "image-container";
			singleImage.innerHTML = '<img src=" ' + thumb + '"/>';
			document.querySelector(".gallery").appendChild(singleImage);
		});

		if (actor.movies) {
			let table = document.createElement("table");
			let thead = document.createElement("thead");
			thead.innerHTML = `<td colspan="3">Movies</td>`;

			let tbody = document.createElement("tbody");
			tbody.id = "movies";
			actor.movies.forEach((movieId) => {
				let movie = data.movies.find((mov) => mov.id == movieId);
				let movieRow = document.createElement("tr");
				movieRow.innerHTML = "<td><a href='single-movie.html?id=" + movie.id + "'>" + movie.name + "</a></td><td>Actor</td><td>" + movie.year + "</td>";
				tbody.append(movieRow);
			});
			table.appendChild(thead);
			table.appendChild(tbody);

			document.querySelector(".right-content").appendChild(table);
		}

		if (actor.shows) {
			let table = document.createElement("table");
			let thead = document.createElement("thead");
			thead.innerHTML = `<td colspan="3">Shows</td>`;

			let tbody = document.createElement("tbody");
			tbody.id = "shows";
			actor.shows.forEach((showObj) => {
				let show = data.shows.find((show) => show.id == showObj.id);
				let showRow = document.createElement("tr");
				showRow.innerHTML = "<td><a href='single-show.html?id=" + show.id + "'>" + show.name + "</a></td><td>Actor</td><td>" + show.year + "</td>";
				tbody.append(showRow);
			});
			table.appendChild(thead);
			table.appendChild(tbody);

			document.querySelector(".right-content").appendChild(table);
		}
	} catch (err) {
		console.log(err);
	}
}

var url = new URL(document.URL);
var id = url.searchParams.get("id");
displayContent(id).then(function () {
	let galleries = document.querySelectorAll(".gallery");

	galleries.forEach((gallery) => {
		new Lightbox(gallery);
	});
});
