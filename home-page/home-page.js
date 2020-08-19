let COUNTRIES = [];
const BASE_URL = "https://restcountries.eu/rest/v2";

const listOfElems = document.getElementById("listOfCountries");
const searchElem = document.getElementById("search");
const searchCriteriaElem = document.getElementById("search-criteria");
const countryRadioElem = document.getElementById("country");
const capitalRadioElem = document.getElementById("capital");

const SEARCH_BY = {
  country: 1,
  capital: 2,
};

async function getCountriesByCriteria(criteria, searchBy) {
  if (!(criteria && searchBy)) {
    let response = await fetch(`${BASE_URL}/all`);
    let countries = await response.json();
    COUNTRIES = countries.slice(0, 25);
    searchCriteriaElem.innerText = "Please Type Country Name or Capital";
  } else {
    if (searchBy === SEARCH_BY.country) {
      try {
        let response = await fetch(`${BASE_URL}/name/${criteria}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        COUNTRIES = await response.json();
        searchCriteriaElem.innerText = `Searched By Country Name: "${criteria}" Found: ${COUNTRIES.length} Countries. `;
      } catch (error) {
        COUNTRIES = [];
        searchCriteriaElem.innerText = "No Countries Found";
      }
    }
    if (searchBy === SEARCH_BY.capital) {
      try {
        let response = await fetch(`${BASE_URL}/capital/${criteria}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        COUNTRIES = await response.json();
        searchCriteriaElem.innerText = `Searched By Capital: "${criteria}" Found: ${COUNTRIES.length} Countries. `;
      } catch (error) {
        COUNTRIES = [];
        searchCriteriaElem.innerText = "No Countries Found";
      }
    }
  }
}

function favoriteChecked(checkboxElement, name) {
  if (checkboxElement.checked) {
    localStorage.setItem(name, "");
  } else {
    localStorage.removeItem(name);
  }
}

function createAndAddElement(country) {
  let newCountryElement = document.createElement("tr");
  newCountryElement.className = "list-container";
  let imageElem = document.createElement("td");
  imageElem.className = "table-item";
  let IMGElem = document.createElement("img");
  IMGElem.className = "image";
  IMGElem.width = 30;
  IMGElem.src = country.flag;
  imageElem.append(IMGElem);
  let countryElem = document.createElement("td");
  countryElem.className = "table-item";
  countryElem.innerText = country.name;
  let capitalElem = document.createElement("td");
  capitalElem.className = "table-item";
  capitalElem.innerText = country.capital ? country.capital : " No Capital";
  let languageElem = document.createElement("td");
  languageElem.className = "table-item";
  languageElem.innerText = country.languages[0].name;

  let favoriteElem = document.createElement("td");
  favoriteElem.className = "table-item";
  let checkbox = document.createElement("input");
  checkbox.addEventListener("click", () => {
    favoriteChecked(checkbox, country.name);
  });
  checkbox.type = "checkbox";
  checkbox.id = country.name;
  favoriteElem.append(checkbox);
  newCountryElement.append(imageElem);
  newCountryElement.append(countryElem);
  newCountryElement.append(capitalElem);
  newCountryElement.append(languageElem);
  newCountryElement.append(favoriteElem);
  listOfElems.append(newCountryElement);
}

function addCountiesToDOM() {
  listOfElems.innerHTML = "";
  COUNTRIES.forEach((country) => {
    createAndAddElement(country);
  });
}

async function searchByCriteria() {
  console.log(countryRadioElem.checked, capitalRadioElem.checked);
  let idOfSearch = countryRadioElem.checked
    ? 1
    : capitalRadioElem.checked
    ? 2
    : null;
  await getCountriesByCriteria(searchElem.value, idOfSearch);
  addCountiesToDOM();
}

function checkFavoriteCountries() {
  let favCountries = Object.keys(localStorage);
  favCountries.forEach((country) => {
    document.getElementById(country).checked = true;
  });
}

window.onload = async () => {
  await getCountriesByCriteria();
  addCountiesToDOM();
  checkFavoriteCountries();
  searchElem.addEventListener("keyup", () => {
    searchByCriteria();
  });
};

console.log(window.location.href);
