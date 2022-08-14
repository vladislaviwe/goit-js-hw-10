export function fetchCountries(countryName) {
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
    ;
} 