class Lightbox {
	constructor(galleryCont) {
		this.galleryContainer = galleryCont;
		this.galleryItems = Array.from(this.galleryContainer.children);

		this.createPopup();

		this.addEventListeners();
	}

	createPopup() {
		if (!this.popupContainer) {
			let popupContainer = document.createElement("div");
			popupContainer.className = "lightbox";
			popupContainer.classList.add("lightbox-popup");
			popupContainer.setAttribute("tabindex", "-1");

			let popupImg = document.createElement("img");
			popupImg.className = "zoomed";

			popupContainer.appendChild(popupImg);
			document.body.appendChild(popupContainer);

			this.popupContainer = popupContainer;
			this.popupImg = popupImg;

			this.addArrows();
		}
	}

	addArrows() {
		this.beforeIcon = document.createElement("span");
		this.beforeIcon.classList.add("before");
		this.beforeIcon.innerHTML = "&#10140;";

		this.afterIcon = document.createElement("span");
		this.afterIcon.classList.add("after");
		this.afterIcon.innerHTML = "&#10140;";

		this.popupContainer.insertBefore(this.beforeIcon, this.popupContainer.firstChild);
		this.popupContainer.appendChild(this.afterIcon);
	}

	addEventListeners() {
		this.galleryItems.forEach((item, index) => {
			item.addEventListener("click", () => {
				this.activeItem = item;
				this.currentIndex = index;
				this.openPopup(item);
			});
		});

		this.popupContainer.addEventListener("click", () => {
			this.popupOpen = false;
			this.closePopup();
		});

		document.addEventListener("keydown", (e) => {
			if (this.popupOpen) {
				if (e.code == "ArrowRight") {
					this.showImg(this.currentIndex + 1);
				} else if (e.code == "ArrowLeft") {
					this.showImg(this.currentIndex - 1);
				}
			}
		});

		this.popupImg.addEventListener("click", (e) => {
			e.stopPropagation();
		});

		this.beforeIcon.addEventListener("click", (e) => {
			e.stopPropagation();
			this.showImg(this.currentIndex - 1);
		});

		this.afterIcon.addEventListener("click", (e) => {
			e.stopPropagation();
			this.showImg(this.currentIndex + 1);
		});
	}

	openPopup() {
		this.popupOpen = true;
		let img = this.activeItem.firstElementChild;
		let src = img.getAttribute("src");

		this.popupImg.setAttribute("src", src);

		this.popupContainer.style.display = "flex";
	}

	closePopup() {
		this.popupImg.setAttribute("src", "");

		this.popupContainer.style.display = "none";
	}

	showImg(index) {
		if (index >= this.galleryItems.length) index = 0;
		else if (index < 0) index = this.galleryItems.length - 1;

		this.activeItem = Array.from(this.galleryItems)[index];
		this.currentIndex = index;
		this.openPopup();
	}
}

let galleries = document.querySelectorAll(".gallery");

galleries.forEach((gallery) => {
	let galleryObj = new Lightbox(gallery);
});
