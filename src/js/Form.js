export class Form {
	constructor(params) {
		this.fields = {};
		this.id = params.id;
		this.displayLabel = params.displayLabel != undefined ? params.displayLabel : true;

		console.log(params.displayLabel, this);

		return this.generateForm(params);
		//this.generateFormFields(params);
	}

	generateForm(params) {
		let form = document.createElement("form");
		if (this.id) form.id = params.id;

		params.fields.forEach((field) => {
			let fname = "generate" + field.type.charAt(0).toUpperCase() + field.type.slice(1);
			let inputField;
			switch (field.type) {
				case "text":
				case "email":
				case "password":
					inputField = this.generateInputField(field);
					break;
				default:
					inputField = this[fname](field);
			}

			form.appendChild(inputField);

			this.fields[field.title.toLowerCase()] = inputField;
		});

		form.addEventListener("submit", function (e) {
			e.preventDefault();
			this.submit();
		});

		return form;
	}

	generateInputField(field) {
		let input = document.createElement("input");
		input.type = field.type;
		input.name = field.title.toLowerCase().replace(" ", "-");

		if (this.displayLabel) {
			let label = document.createElement("label");
			label.textContent = field.title;
			label.appendChild(input);

			return label;
		} else {
			input.placeholder = field.title;
			return input;
		}
	}

	generateTextarea(field) {
		let label = document.createElement("label");
		label.textContent = field.title;

		let textarea = document.createElement("textarea");
		textarea.rows = 5;

		label.appendChild(textarea);

		return label;
	}

	generateSelectbox(field) {
		let label = document.createElement("label");
		label.innerHTML = "<h3>" + field.title + "</h3>";

		let selectbox = document.createElement("select");
		selectbox.name = field.title.toLowerCase();
		field.values.forEach((value) => {
			let option = document.createElement("option");
			option.value = value;
			option.textContent = value;

			selectbox.appendChild(option);
		});

		label.appendChild(selectbox);

		return label;
	}

	generateCheckbox(field) {
		let list = document.createElement("ul");
		list.innerHTML = "<h3>" + field.title + "</h3>";
		field.values.forEach((value) => {
			let li = document.createElement("li");
			li.className = "flex";

			let label = document.createElement("label");
			label.textContent = value;

			let checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.value = value;
			label.appendChild(checkbox);

			li.appendChild(label);

			list.appendChild(li);
		});

		return list;
	}

	generateRadio(field) {
		let list = document.createElement("ul");
		list.innerHTML = "<h3>" + field.title + "</h3>";
		field.values.forEach((value) => {
			let li = document.createElement("li");
			li.className = "flex";

			let label = document.createElement("label");
			label.textContent = value;

			let radio = document.createElement("input");
			radio.type = "radio";
			radio.value = value;
			radio.name = field.title.toLowerCase();
			label.appendChild(radio);

			li.appendChild(label);

			list.appendChild(li);
		});

		return list;
	}

	generateSubmit(field) {
		let button = document.createElement("button");
		button.textContent = field.title;
		button.type = "submit";

		button.addEventListener("click", (e) => {
			e.preventDefault();
			this.submit();
		});

		return button;
	}

	submit() {}
}
