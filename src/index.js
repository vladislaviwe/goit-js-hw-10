import './css/styles.css';
import fetchCountries from './fetchCountries';
import MARKUPS from './markups';
import getRefs from './get-refs';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.input.addEventListener('input', debounce(function() {
	this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');
    doSearch()
}, DEBOUNCE_DELAY));


function doSearch() {
    const countryName = refs.input.value.trim().toLowerCase();

    inputClear();

    fetchCountries(countryName)
    .then((country) => {
            createMarkup(country)
    })
}

const insertListMarkup = (element) => {
    refs.countryList.insertAdjacentHTML("beforeend", MARKUPS.listMarkup(element));
}

const insertCardMarkup = (element) => {
    refs.countryCard.insertAdjacentHTML("beforeend", MARKUPS.cardMarkup(element));
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
