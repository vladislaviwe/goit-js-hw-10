const listMarkup = (element) => `
<li style="list-style: none; margin-bottom: 5px; margin-left: 0px">
    <span style="display: inline">
        <img src="${element.flags.svg}" alt="${element.name.official}" width="40px">
    </span>
    <p style="display: inline; font-size: 27px; font-weight: 700; font-family: arial">${element.name.common}</p>
</li>
`;

const cardMarkup = (element) => `
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
export default { listMarkup, cardMarkup }