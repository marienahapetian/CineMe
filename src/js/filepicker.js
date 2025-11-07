class Filepicker {
	constructor(fileInputCont) {
		this.filepickerContainer = fileInputCont;
		this.fileInput = Array.from(this.filepickerContainer.children).find((el) => el.type == "file");

		this.createGalleryCont();
		this.addEventListeners();
	}

	createGalleryCont() {
		let galleryCont = document.createElement("div");
		galleryCont.className = "gallery";
		this.galleryCont = galleryCont;
		this.filepickerContainer.parentElement.append(galleryCont);
	}

	addEventListeners() {
		this.filepickerContainer.addEventListener("click", () => {
			this.fileInput.click();
		});

		this.fileInput.addEventListener("change", (e) => {
			// create single image container
			let imgCont = document.createElement("span");
			imgCont.className = "single-img";

			// create edit and delete buttons container
			let buttonsCont = document.createElement("div");

			// create edit button
			let editButton = document.createElement("span");
			editButton.className = "edit";
			editButton.addEventListener("click", () => {
				this.imgChangeButton = editButton;
				this.fileInput.click();
			});
			buttonsCont.append(editButton);

			// create delete button
			let deleteButton = document.createElement("span");
			deleteButton.className = "delete";
			deleteButton.addEventListener("click", function () {
				this.parentElement.parentElement.remove();
			});
			buttonsCont.append(deleteButton);

			// create img from the selected file
			if (this.imgChangeButton) {
				let img = this.imgChangeButton.parentElement.parentElement.getElementsByTagName("img")[0];
				img.src = URL.createObjectURL(this.fileInput.files[0]);
			} else {
				let img = document.createElement("img");
				img.src = URL.createObjectURL(this.fileInput.files[0]);
				img.width = 150;
				imgCont.append(img);

				imgCont.append(buttonsCont);
				this.galleryCont.insertBefore(imgCont, this.galleryCont.firstElementChild);
			}

			this.imgChangeButton = null;
		});
	}
}

document.querySelectorAll(".filepicker").forEach((element) => {
	let f = new Filepicker(element);
});
