import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryCard: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange() {
    const countryName = refs.input.value.trim().toLowerCase();
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
   .then(response => {
    if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
   })
   .then((country) => {
    if (country.length > 1 && country.length < 10)  {
        country.forEach(element => {
            insertListMarkup(element);
        });
    }
   })
}

const createListMarkup = (element) => `
<li style="list-style: none; margin-bottom: 5px">
    <span style="display: inline">
        <img src="${element.flags.svg}" alt="${element.name.official}" width="40px">
    </span>
    <p style="display: inline; font-size: 27px; font-weight: 700; font-family: arial">${element.name.common}</p>
</li>
`;

const createCardMarkup = (element) => `
<div>
    <span style="display: inline">
        <img src="${element.flags.svg}" alt="${element.name.official}" width="40px">
    </span>
    <p style="display: inline; font-size: 27px; font-weight: 700; font-family: arial">${element.name.official}</p>

</div>
`

const insertListMarkup = (element) => {
    refs.countryList.insertAdjacentHTML("beforeend", createListMarkup(element));
}