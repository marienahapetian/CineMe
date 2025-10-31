class Slider {
	constructor(sliderCont, visibleCount = 4) {
		this.sliderContainer = sliderCont;
		this.visibleCount = visibleCount;

		this.addArrows();
		this.addFilmLines();
		this.initiateTrack();
		this.addEventListeners();
	}

	addEventListeners() {
		this.beforeIcon.addEventListener("click", () => this.prevSlide());
		this.afterIcon.addEventListener("click", () => this.nextSlide());
	}

	addFilmLines() {
		let filmLine = document.createElement("div");
		filmLine.className = "film_line";
		let list = document.createElement("ul");

		for (let i = 0; i < 10; i++) {
			let li = document.createElement("li");
			list.appendChild(li);
		}

		filmLine.appendChild(list);

		let secondLine = filmLine.cloneNode(true);

		this.sliderContainer.parentElement.insertBefore(filmLine, this.sliderContainer);
		this.sliderContainer.parentElement.insertBefore(secondLine, this.sliderContainer.nextSibling);
	}

	addArrows() {
		this.beforeIcon = document.createElement("span");
		this.beforeIcon.classList.add("before");
		this.beforeIcon.innerHTML = "&#10140;";

		this.afterIcon = document.createElement("span");
		this.afterIcon.classList.add("after");
		this.afterIcon.innerHTML = "&#10140;";

		this.sliderContainer.insertBefore(this.beforeIcon, this.sliderContainer.firstChild);
		this.sliderContainer.appendChild(this.afterIcon);
	}

	initiateTrack() {
		let sliderTrackA = Array.from(this.sliderContainer.childNodes).filter((child) => child.className?.includes("slider__track"));
		this.sliderTrack = sliderTrackA[0];
		let sliderListA = Array.from(this.sliderTrack.childNodes).filter((child) => child.className?.includes("slider__list"));
		this.sliderList = sliderListA[0];
		this.slides = Array.from(this.sliderList.children);
		this.totalSlides = this.slides.length;

		this.slideWidth = this.sliderContainer.offsetWidth / this.visibleCount;
		this.sliderStep = this.slideWidth;

		this.slides.forEach((slide) => {
			slide.style.width = `${this.slideWidth}px`;
			slide.style.flexShrink = "0";
		});
		this.currentIndex = 0;
	}

	nextSlide() {
		console.log(this.currentIndex, this.visibleCount, this.totalSlides);

		if (this.currentIndex + this.visibleCount >= this.totalSlides) return;

		this.currentIndex++;
		this.goToSlide(this.currentIndex);
	}

	prevSlide() {
		console.log(this.currentIndex, this.visibleCount, this.totalSlides);

		if (this.currentIndex == 0) return;

		this.currentIndex--;

		this.goToSlide(this.currentIndex);
	}

	goToSlide(index) {
		this.sliderList.style.transform = `translateX(-${index * this.slideWidth}px)`;
	}
}

let sliders = document.querySelectorAll(".slider");

sliders.forEach((slider) => {
	let visibleCount = 4;
	if (slider.getAttribute("data-slidesToShow")) visibleCount = parseInt(slider.getAttribute("data-slidesToShow"));

	let sliderObj = new Slider(slider, visibleCount);

	//setInterval(sliderObj.animateLeft.bind(sliderObj), 5000);
	//sliderObj.animate();
	//setInterval(() => sliderObj.animateLeft(), 2000); // autoplay every 5s
});
