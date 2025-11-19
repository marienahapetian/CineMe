class Slider {
	constructor(sliderCont, visibleCount = 4, height = 300) {
		this.sliderContainer = sliderCont;
		this.visibleCount = visibleCount;
		this.hasLines = this.sliderContainer.dataset.lines ? this.sliderContainer.dataset.lines : false;
		this.sliderHeight = height;

		this.initiateTrack();

		if (this.hasLines) {
			this.addFilmLines();
		}

		this.addControls();

		this.addEventListeners();
	}

	addEventListeners() {
		this.beforeIcon.addEventListener("click", () => this.prevSlide());
		this.afterIcon.addEventListener("click", () => this.nextSlide());

		if (this.dots) {
			this.dots.forEach((dot, index) => {
				dot.addEventListener("click", () => this.goToSlide(index));
			});
		}
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

	addControls() {
		this.beforeIcon = document.createElement("span");
		this.beforeIcon.classList.add("before");
		this.beforeIcon.innerHTML = "&#10140;";

		this.afterIcon = document.createElement("span");
		this.afterIcon.classList.add("after");
		this.afterIcon.innerHTML = "&#10140;";

		// add dots only if we display 1 slide
		if (this.visibleCount == 1) {
			this.dotsLine = document.createElement("div");
			this.dotsLine.className = "dots";
			for (let i = 0; i < this.totalSlides; i++) {
				let dot = document.createElement("span");
				if (i == this.currentIndex) dot.className = "active";
				this.dotsLine.appendChild(dot);
			}

			this.sliderContainer.appendChild(this.dotsLine);
			this.dots = this.dotsLine.querySelectorAll("span");
		}

		this.sliderContainer.insertBefore(this.beforeIcon, this.sliderContainer.firstChild);
		this.sliderContainer.appendChild(this.afterIcon);
	}

	initiateTrack() {
		this.sliderContainer.style.height = this.sliderHeight + "px";
		let sliderTrackA = Array.from(this.sliderContainer.childNodes).filter((child) => child.className?.includes("slider__track"));
		this.sliderTrack = sliderTrackA[0];
		let sliderListA = Array.from(this.sliderTrack.childNodes).filter((child) => child.className?.includes("slider__list"));
		this.sliderList = sliderListA[0];
		this.slides = Array.from(this.sliderList.children);
		this.totalSlides = this.slides.length;

		this.slideWidth = this.sliderContainer.offsetWidth / this.visibleCount;
		this.sliderStep = this.slideWidth;

		this.slides.forEach((slide) => {
			if (this.visibleCount > 1) {
				slide.style.width = `${this.slideWidth}px`;
				slide.style.flexShrink = "0";
			} else {
				slide.style.height = this.sliderContainer.dataset.height;
				slide.style.width = `${this.slideWidth}px`;
			}
		});
		this.currentIndex = 0;
	}

	nextSlide() {
		console.log("in nextSlide", this.currentIndex, this.visibleCount, this.totalSlides);

		// deactivate next arrow on slider end
		if (this.currentIndex + this.visibleCount >= this.totalSlides) return;

		this.currentIndex++;
		this.goToSlide(this.currentIndex);
	}

	prevSlide() {
		console.log("in prevSlide", this.currentIndex, this.visibleCount, this.totalSlides);

		// deactivate prev arrow on slider start
		if (this.currentIndex == 0) return;

		this.currentIndex--;

		this.goToSlide(this.currentIndex);
	}

	goToSlide(index) {
		if (this.dots) {
			this.dots.forEach((dot, i) => {
				if (i == index) {
					dot.className = "active"; // change color of active slide dot
					this.currentIndex = i; //update current slide index
				} else {
					dot.className = ""; // remove active color from the remaining dots
				}
			});
		}

		this.sliderList.style.transform = `translateX(-${index * this.slideWidth}px)`;
	}
}
