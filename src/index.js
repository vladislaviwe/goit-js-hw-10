import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryCard: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(function() {
	this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');
    doSearch()
}
    , DEBOUNCE_DELAY));


function doSearch() {
    const countryName = refs.input.value.trim().toLowerCase();
    inputClear();
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if (!response.ok) {
            Notiflix.Notify.failure('404 (Not found)');
        }
        return response.json();
    })
    .then((country) => {
        createMarkup(country)
    })
}

const ListMarkup = (element) => `
<li style="list-style: none; margin-bottom: 5px; margin-left: 0px">
    <span style="display: inline">
        <img src="${element.flags.svg}" alt="${element.name.official}" width="40px">
    </span>
    <p style="display: inline; font-size: 27px; font-weight: 700; font-family: arial">${element.name.common}</p>
</li>
`;

const CardMarkup = (element) => `
<div>
    <span style="display: inline">
        <img src="${element.flags.svg}" alt="${element.name.official}" width="40px">
    </span>
    <p style="display: inline; font-size: 27px; font-weight: 700; font-family: arial">${element.name.official}</p>
    <p style="font-size: 16px; font-weight: 700; font-family: arial">Capital: ${element.capital}</p>
    <p style="font-size: 16px; font-weight: 700; font-family: arial">Population: ${element.population}</p>
    <p style="font-size: 16px; font-weight: 700; font-family: arial">Languages: ${Object.values(element.languages)}</p>
</div>
`

const insertListMarkup = (element) => {
    refs.countryList.insertAdjacentHTML("beforeend", ListMarkup(element));
}

const insertCardMarkup = (element) => {
    refs.countryCard.insertAdjacentHTML("beforeend", CardMarkup(element));
}

function inputClear() {
    if (refs.input.value === "" || refs.countryCard.innerHTML !== "" || refs.countryList.innerHTML !== "") {
        refs.countryCard.innerHTML = "";
        refs.countryList.innerHTML = "";
    }
}

function createMarkup(country) {
    if (country.length > 1 && country.length < 10)  {
            inputClear()
            country.forEach(element => {
                insertListMarkup(element);
            });
        } if (country.length === 1) {
            inputClear()
            insertCardMarkup(country[0]);
        } if (country.length >= 10) {
            inputClear()
            Notiflix.Notify.info(
             'Too many matches found. Please enter a more specific name.'       
            )
        }
}