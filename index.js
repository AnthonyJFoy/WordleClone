// Use of RapidAPI to obtain a wordle word. Not used in this application, words are given as array in app.js.

const axios = require("axios");

const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: {count: '20', wordLength: '5'},
    headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});