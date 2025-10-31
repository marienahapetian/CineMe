let mainImg = document.querySelector(".movie-page .main-img img");
if (mainImg) {
	document.body.style.backgroundImage = `url(${mainImg.getAttribute("src")})`;
	document.body.style.backgroundSize = "fit";
}
