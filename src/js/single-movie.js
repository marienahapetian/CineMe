import { Lightbox } from "./Lightbox.js";

let html = "";

async function displayContent(id) {
	try {
		const response = await fetch("/public/data.json");
		if (!response.ok) {
			throw new Error(`Response status: ${response.statusText}`);
		}

		const data = await response.json();

		let movie = data.movies.find((movie) => movie.id == id);

		document.getElementById("year").textContent = movie.year;
		document.getElementById("genre").textContent = movie.genre.join(" ");

		document.querySelector(".main-img img").src = movie.image;

		movie.thumbs.forEach((thumb) => {
			let singleImage = document.createElement("span");
			singleImage.className = "image-container";
			singleImage.innerHTML = '<img src=" ' + thumb + '"/>';
			document.querySelector(".gallery").appendChild(singleImage);
		});

		let actors = data.actors.filter((actor) => actor.movies.includes(Number.parseInt(id)));

		console.log(actors);

		actors.forEach((actor) => {
			let actorRow = document.createElement("tr");
			actorRow.innerHTML = "<td><a href='single-prof.html?id=" + actor.id + "'>" + actor.name + "</a></td><td>Actor</td><td>" + movie.year + "</td>";
			document.getElementById("actors").append(actorRow);
		});

		console.log(actors);

		document.getElementById("name").textContent = movie.name;
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
