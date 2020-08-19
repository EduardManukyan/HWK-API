let COUNTRIES = [];
const BASE_URL = "https://restcountries.eu/rest/v2";

const listOfElems = document.getElementById("listOfCountries");
const searchCriteriaElem = document.getElementById("search-criteria");

async function getCountriesByCriteriaAddToDom(criteria) {
  try {
    let response = await fetch(`${BASE_URL}/name/${criteria}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    await response.json().then((json) => {
      COUNTRIES.push(json[0]);
    });
    searchCriteriaElem.innerText = "";
  } catch (error) {
    COUNTRIES = [];
    searchCriteriaElem.innerText = "No Countries Found";
  }
}

function favoriteChecked(checkboxElement, name) {
  if (checkboxElement.checked) {
    localStorage.setItem(name, "");
  } else {
    localStorage.removeItem(name);
    location.reload();
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

function checkFavoriteCountries() {
  let favCountries = Object.keys(localStorage);
  favCountries.forEach((country) => {
    if (document.getElementById(country))
      document.getElementById(country).checked = true;
  });
}

function getCountriesFromLocalStorage() {
  return Object.keys(localStorage);
}

window.onload = () => {
  let countries = getCountriesFromLocalStorage();
  let promises = countries.map((country) => {
    return getCountriesByCriteriaAddToDom(country);
  });
  Promise.all(promises).then(() => {
    addCountiesToDOM();
    checkFavoriteCountries();
  });
};
