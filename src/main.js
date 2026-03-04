import './style.css'
import { stays } from "./stays.js";
import star from "./images/icons/star.svg";
import { filterByCity, filterByGuests } from './utilis.js';

const container = document.getElementById("stays-container");
const count = document.getElementById("stays-count");

const locationBtn = document.getElementById("location-btn");
const guestsBtn = document.getElementById("guests-btn");
const searchBtn = document.getElementById("search-btn");

const searchPanel = document.getElementById("search-panel");
const locationSection = document.getElementById("location-section");
const guestsSection = document.getElementById("guests-section");
const cityList = document.getElementById("city-list");

const adultCount = document.getElementById("adult-count");
const childCount = document.getElementById("child-count");

// Estado
let selectedCity = "";
let adults = 0;
let children = 0;

const cities = [...new Set(stays.map(stay => stay.city))];


// -------------------- RENDER --------------------

function renderStays(data) {
  container.innerHTML = "";
  count.textContent = `${data.length} stays`;

  data.forEach((stay) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-2xl overflow-hidden";

    card.innerHTML = `
      <img src="${stay.photo}" 
           class="w-full h-60 object-cover rounded-2xl mb-4" />

      <div class="flex justify-between items-center text-sm mb-2">
        ${
          stay.superHost
            ? `<span class="border px-2 py-1 rounded-full text-xs font-bold">SUPERHOST</span>`
            : `<span></span>`
        }

        <span class="flex items-center gap-1 text-gray-600">
          <img src="${star}" class="w-4 h-4" alt="star" />
          ${stay.rating}
        </span>
      </div>

      <p class="text-gray-500 text-sm mb-2">
        ${stay.type} ${stay.beds ? `· ${stay.beds} beds` : ""}
      </p>

      <h2 class="font-semibold">
        ${stay.title}
      </h2>
    `;

    container.appendChild(card);
  });
}

renderStays(stays);


// -------------------- PANEL TOGGLE --------------------

locationBtn.addEventListener("click", () => {
  searchPanel.classList.remove("hidden");
  locationSection.classList.remove("hidden");
  guestsSection.classList.add("hidden");
});

guestsBtn.addEventListener("click", () => {
  searchPanel.classList.remove("hidden");
  guestsSection.classList.remove("hidden");
  locationSection.classList.add("hidden");
});


// -------------------- GENERAR CIUDADES --------------------

cities.forEach(city => {
  const item = document.createElement("p");
  item.textContent = `${city}, Finland`;
  item.className = "cursor-pointer hover:bg-gray-100 p-2 rounded";

  item.addEventListener("click", () => {
    selectedCity = city;
    locationBtn.textContent = `${city}, Finland`;
  });

  cityList.appendChild(item);
});


// -------------------- GUESTS +/- --------------------

document.getElementById("adult-plus").onclick = () => {
  adults++;
  adultCount.textContent = adults;
};

document.getElementById("adult-minus").onclick = () => {
  if (adults > 0) adults--;
  adultCount.textContent = adults;
};

document.getElementById("child-plus").onclick = () => {
  children++;
  childCount.textContent = children;
};

document.getElementById("child-minus").onclick = () => {
  if (children > 0) children--;
  childCount.textContent = children;
};


// -------------------- SEARCH BUTTON --------------------

searchBtn.addEventListener("click", () => {

  const totalGuests = adults + children;

  // Actualizar texto botón guests
  guestsBtn.textContent = totalGuests > 0
    ? `${totalGuests} guests`
    : "Add guests";

  let filtered = stays;

  if (selectedCity) {
    filtered = filterByCity(filtered, selectedCity);
  }

  if (totalGuests > 0) {
    filtered = filterByGuests(filtered, totalGuests);
  }

  renderStays(filtered);

  searchPanel.classList.add("hidden");
});




/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */

