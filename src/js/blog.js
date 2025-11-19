let html = "";

String.prototype.urlfriendly = function () {
	return this.toLowerCase().replace(" ", "-");
};

async function displayContent() {
	try {
		const response = await fetch("/public/data.json");
		if (!response.ok) {
			throw new Error(`Response status: ${response.statusText}`);
		}

		const data = await response.json();

		let news = data.news;

		let pagination = new Pagination(news, perPage, page);
		pagination.create();

		let newsToShow = news.slice((page - 1) * perPage, page * perPage);

		newsToShow.forEach((newsS) => {
			html += `<a href="single-news.html?id=${newsS.id}" ><div class="image-container"><img src="${newsS.image}" /></div><div><h3>${newsS.title}</h3><p>${newsS.content.slice(
				0,
				250
			)}...</p><i>Date: ${newsS.date}</i></div></a>`;
		});

		document.getElementById("news-list").innerHTML = html;
	} catch (err) {
		console.log(err);
	}
}

const url = new URL(document.URL);
const perPage = 4;
const page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;
displayContent();
