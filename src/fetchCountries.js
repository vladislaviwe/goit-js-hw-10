import Notiflix from "notiflix";

const BASE_URL = 'https://restcountries.com/v3.1/';
const OPTIONS = 'name,capital,population,flags,languages';

export default function fetchCountries(countryName) {
    return fetch(`${BASE_URL}name/${countryName}?fields=${OPTIONS}`)
    .then(response => {
        if (!response.ok) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        }
    return response.json();
    })
}