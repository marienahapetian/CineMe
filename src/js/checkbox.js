document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((ch) => {
	ch.parentElement.classList.add("checkbox");

	if (ch.getAttribute("checked") != null) ch.parentElement.classList.add("checked");

	ch.addEventListener("change", function () {
		if (this.type == "radio") {
			this.parentElement.parentElement.parentElement.querySelectorAll("label").forEach((s) => s.classList.remove("checked"));
		}

		this.parentElement.classList.toggle("checked");
	});
});
