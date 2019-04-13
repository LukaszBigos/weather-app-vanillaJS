const searchBtn = document.getElementById('search-btn');

const appId = '059bb4f68a529c6aa7a74e55b92e3cfd';
const units = 'metric';
const searchMethod = 'city';


const searchWeather = (searchTerm) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=${appId}&units=${units}`)
    .then(result => {
      return result.json();
    })
    .then(result => {
      init(result);
    });
};

const init = (resultFromServer) => {
  console.log(resultFromServer);
};

searchBtn.addEventListener('click', () => {
  const searchTerm = document.getElementById('search-input').value;
  if (searchTerm) {
    searchWeather(searchTerm);
  }
});