export class Form {
	constructor(params) {
		this.fields = params.fields;
		this.id = params.id;

		return this.generateForm(params);
		//this.generateFormFields(params);
	}

	generateForm(params) {
		let form = document.createElement("form");
		if (this.id) form.id = params.id;

		this.fields.forEach((field) => {
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
		});

		return form;
	}

	generateInputField(field) {
		let label = document.createElement("label");
		label.textContent = field.title;

		let input = document.createElement("input");
		input.type = field.type;

		label.appendChild(input);

		return label;
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

	generateButton() {}

	submit() {}
}
