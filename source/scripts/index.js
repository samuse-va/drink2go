/* global L:readonly */

const map = L.map("map").setView(
  {
    lat: 59.96831,
    lng: 30.31748,
  },
  16
);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: "../images/icons/map-pin.svg",
  iconSize: [38, 50],
  iconAnchor: [19, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 59.96831,
    lng: 30.31748,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

mainPinMarker.on("moveend", (evt) => {
  console.log(evt.target.getLatLng());
});

const buttonNext = document.querySelector(".promotion__button--next");
const buttonPrevious = document.querySelector(".promotion__button--previous");
const slides = Array.from(document.querySelectorAll(".slider__item"));
const sliderButtons = Array.from(
  document.querySelectorAll(".promotion__slider-button")
);
const section = document.querySelector(".promotion");

const slideCount = slides.length;
let slideIndex = 0;

const setColor = (index) => {
  return `promotion--${index + 1}`;
};

buttonPrevious.addEventListener("click", showPreviousSlide);
buttonNext.addEventListener("click", showNextSlide);

sliderButtons.forEach((button) =>
  button.addEventListener("click", () => {
    slideIndex = sliderButtons.indexOf(button);
    updateSlider();
  })
);

function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = "flex";
      section.classList.add(setColor(index));
      sliderButtons[index].classList.add("promotion__slider-button--current");
    } else {
      slide.style.display = "none";
      section.classList.remove(setColor(index));
      sliderButtons[index].classList.remove(
        "promotion__slider-button--current"
      );
    }
  });
}

updateSlider();
