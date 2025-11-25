export class Pagination {
	constructor(data, perPage = 10, currPage = 1) {
		// data has to be array
		this.data = data;
		this.perPage = perPage;
		this.currPage = currPage;

		this.totalCount = this.data.length;
		this.pageCount = Math.ceil(this.totalCount / this.perPage);

		this.urlBase = window.location.href;
		this.beforeGetPars = this.urlBase.substring(0, this.urlBase.indexOf("?"));
	}

	create() {
		let pagination = document.createElement("ul");
		pagination.className = "pagination";

		for (let i = 1; i <= this.pageCount; i++) {
			let page = document.createElement("li");
			if (i == this.currPage) page.className = "current";
			page.innerHTML = `<a href="${this.beforeGetPars}?page=${i}">${i}</a>`;
			pagination.appendChild(page);
		}

		document.getElementById("pagination-container").appendChild(pagination);
	}
}
