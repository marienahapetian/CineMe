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

		document.querySelector(".main-img img").src = actor.image;

		actor.thumbs.forEach((thumb) => {
			let singleImage = document.createElement("span");
			singleImage.className = "image-container";
			singleImage.innerHTML = '<img src=" ' + thumb + '"/>';
			document.querySelector(".gallery").appendChild(singleImage);
		});

		actor.movies.forEach((movieId) => {
			let movie = data.movies.find((mov) => mov.id == movieId);
			let movieRow = document.createElement("tr");
			movieRow.innerHTML = "<td>" + movie.name + "</td><td>Actor</td><td>" + movie.year + "</td>";
			document.getElementById("movies").append(movieRow);
		});

		document.getElementById("name").textContent = actor.name;
		document.getElementById("birthdate").textContent = "Born: " + actor.birth + " ( Age: " + age(actor) + " yo )";
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
