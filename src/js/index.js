fetch("/public/data.json")
	.then((response) => response.json())
	.then((data) => {
		actors = data.actors;
		movies = data.movies;
		professions = data.professions;
		news = data.news.reverse();

		// add actors slider items
		let actorsHtml = "";
		actors.forEach((actor) => {
			actorsHtml +=
				'<li class="slider__slide horizontal">' +
				'<a href="single-prof.html?id=' +
				actor.id +
				'">' +
				'<div class="image-container">' +
				'<img src="' +
				actor.image +
				'" />' +
				"</div>" +
				'<div class="info">' +
				'<span class="name">' +
				actor.name +
				"</span>" +
				'<span class="profession">' +
				actor.profession +
				"</span>" +
				"</div>" +
				"</a>" +
				"</li>";
		});

		// add movies slider items
		let moviesHtml = "";
		movies.forEach((movie) => {
			moviesHtml +=
				'<li class="slider__slide vertical">' +
				'<a href="single-movie.html?id=' +
				movie.id +
				'">' +
				'<div class="image-container">' +
				'<img src="' +
				movie.image +
				'" />' +
				"</div>" +
				'<div class="info">' +
				'<span class="name">' +
				movie.name +
				"</span>" +
				'<span class="year">' +
				movie.year +
				"</span>" +
				"</div>" +
				"</a>" +
				"</li>";
		});

		document.getElementById("actors").innerHTML = actorsHtml;
		document.getElementById("movies").innerHTML = moviesHtml;

		// add news slider
		let newsHtml = "";
		news.forEach((newsS) => {
			newsHtml +=
				'<li class="slider__slide">' +
				'<a href="single-news.html" class="flex">' +
				'<div class="image-container">' +
				'<img src="' +
				newsS.image +
				'" />' +
				"</div>" +
				'<div class="content">' +
				'<span class="name">' +
				newsS.title.slice(0, 50) +
				"..." +
				"</span>" +
				'<span class="text">' +
				newsS.content.slice(0, 250) +
				"..." +
				"</span>" +
				'<span class="year">Date: ' +
				newsS.date +
				"</span>" +
				"</div>" +
				"</a>" +
				"</li>";
		});
		document.getElementById("news").innerHTML = newsHtml;

		// add profession cards
		let professionsHtml = "";
		professions.forEach((prof) => {
			professionsHtml += '<div class="cat-card">' + '<a href="profs.html">' + '<img src="' + prof.image + '" />' + "<h3>" + prof.name + "</h3>" + "</a>" + "</div>";
		});

		document.getElementById("professions").innerHTML = professionsHtml;
	})
	.then(() => {
		// generate sliders
		let sliders = document.querySelectorAll(".slider");

		sliders.forEach((slider) => {
			let visibleCount = 4;
			if (slider.getAttribute("data-slidesToShow")) visibleCount = parseInt(slider.getAttribute("data-slidesToShow"));

			let sliderHeight = slider.dataset.height ? slider.dataset.height : 300;
			let sliderObj = new Slider(slider, visibleCount, sliderHeight);

			//setInterval(sliderObj.animateLeft.bind(sliderObj), 5000);
			//sliderObj.animate();
			//setInterval(() => sliderObj.animateLeft(), 2000); // autoplay every 5s
		});
	})
	.catch((err) => {
		console.log("Erreur: ", err);
	});
