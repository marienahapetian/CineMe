let html = "";

async function displayContent(id) {
	try {
		const response = await fetch("/public/data.json");
		if (!response.ok) {
			throw new Error(`Response status: ${response.statusText}`);
		}

		const data = await response.json();

		let news = data.news.find((newsS) => newsS.id == id);

		document.querySelector(".main-img img").src = news.image;

		document.getElementById("title").textContent = news.title;
		document.getElementById("content").textContent = news.content;
		document.getElementById("date").textContent = news.date;
	} catch (err) {
		console.log(err);
	}
}

var url = new URL(document.URL);
var id = url.searchParams.get("id");
displayContent(id);
