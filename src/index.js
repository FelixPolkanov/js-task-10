import './css/styles.css';
import  q from './fetchCountries'

const DEBOUNCE_DELAY = 300;

const inputForm = document.querySelector('input#search-box')
inputForm.addEventListener('input', onInputForm)



function onInputForm(evt) {
    inputData = evt.currentTarget.value;
    console.log(inputData)
    // if (inputData) {
    //    function fetchCountries() {
    //       console.log(inputData) 
    //    return fetch('https://restcountries.com/v3.1/name/inputData')   
    // .then(response =>response.json())
    // .then(console.log)
    //     }
    //     fetchCountries(inputData);
 
    // }
}





