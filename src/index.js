import './css/styles.css';
import { fetchArticles } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

 const refs = {
  input: document.querySelector('#search-box'),
  countrylistUl: document.querySelector('.country-list'),
  countryInfoDiv: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const inputValue = evt.target.value.trim();
  if (inputValue === ' ') {
     return;
  }
  fetchArticles(inputValue)
    .then(verifyMarkupByQuantity)
    .catch(error => { Notify.failure('Oops, there is no country with that name') })
 refs.countrylistUl.innerHTML = ' ';
 refs.countryInfoDiv.innerHTML = ' ';
}


function verifyMarkupByQuantity(name) {
  const NumbersOfCountries = name.length;

  if (NumbersOfCountries > 2 && NumbersOfCountries < 10) {
    addFirstMarkup(name);
    return;
  }
  if (NumbersOfCountries === 1) {
    addSecondMarkup(name);
    return;
  }
  if (NumbersOfCountries > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
}


function addFirstMarkup(name) {
  const markup = name.map(({ name, flags }) => {
      return `<li>
      <h2><img width="35" height="25" src="${flags.svg}"</img>
      ${name.official}</h2>`;
  }).join('');
  
  refs.countrylistUl.innerHTML = markup;
  refs.countrylistUl.style.listStyle = "none";
}



 function addSecondMarkup(name) {
  const markup = name.map(({ name, flags, capital, population, languages }) => {
      return `<li>
      <h2><img width="35" height="25" src="${flags.svg}"</img>
      ${name.official}</h2>
      <p>Capital: ${capital[0]}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p></li>`;
  }).join('');
   
  refs.countrylistUl.innerHTML = markup;
  refs.countrylistUl.style.listStyle = "none";
}







