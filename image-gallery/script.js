const filterButtons = document.querySelectorAll(".dropdown-content button");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            if (filter === "all" || item.classList.contains(filter)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }

        });

    });
});

const images = document.querySelectorAll(".gallery-item img");

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");

const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentImage = 0;

function showImage(index) {
    lightboxImage.src = images[index].src;
}


images.forEach((image, index) => {

    image.addEventListener("click", () => {
        currentImage = index;
        showImage(currentImage);
        lightbox.style.display = "flex";

    });

});

closeBtn.addEventListener("click", () => {

    lightbox.style.display = "none";

});

nextBtn.addEventListener("click", () => {

    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    showImage(currentImage);

});

prevBtn.addEventListener("click", () => {

    currentImage--;

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    showImage(currentImage);

});

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }

});

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        lightbox.style.display = "none";
    }

});

document.addEventListener("keydown", (event) => {

    if (lightbox.style.display !== "flex") return;

    if (event.key === "ArrowRight") {
        nextBtn.click();
    }

    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }

    if (event.key === "Escape") {
        closeBtn.click();
    }

});



