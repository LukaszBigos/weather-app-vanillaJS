const searchBtn = document.getElementById("search-btn");

const appId = "059bb4f68a529c6aa7a74e55b92e3cfd";
const units = "metric";
let searchMethod;

searchBtn.addEventListener("click", () => {
  const searchTerm = document.getElementById("search-input").value;
  if (searchTerm) {
    searchWeather(searchTerm);
  }
});

const searchWeather = searchTerm => {
  getSearchMethod(searchTerm);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(result => {
      init(result);
    });
};

const getSearchMethod = searchTerm => {
  if (searchTerm.length === 5 && !isNaN(searchTerm)) {
    searchMethod = "zip";
  } else {
    searchMethod = "q";
  }
};

const init = resultFromServer => {
  console.log(resultFromServer)
  switch (resultFromServer.weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImage = 'url("../assets/clear-sky.jpg")';
      break;
    case 'Clouds':
      document.body.style.backgroundImage = 'url("../assets/clouds.jpg")';
      break;
    case 'Rain':
    case 'Drizzle':
    case 'Mist':
      document.body.style.backgroundImage = 'url("../assets/rain.jpg")';
      break;
    case 'Thunderstorms':
      document.body.style.backgroundImage = 'url("../assets/storm.jpg")';
      break;
    case 'Snow':
      document.body.style.backgroundImage = 'url("../assets/snow.jpg")';
      break;
    default:
      document.body.style.backgroundImage = 'url("../assets/default.jpg")';
      break;
  }

  const cityHeader = document.getElementById('city-header');
  const temperature = document.getElementById('temperature');
  const weatherDescriptionHeader = document.getElementById('weather-description-header');
  const weatherIcon = document.getElementById('weather-summary-icon');
  const wind = document.getElementById('wind-speed');
  const humidity = document.getElementById('humidity');

  weatherDescriptionHeader.innerHTML = resultFromServer.weather[0].description;
  cityHeader.innerHTML = resultFromServer.name;
  temperature.innerHTML = `${Math.floor(resultFromServer.main.temp)} &#176C`;
  weatherIcon.src = `http://openweathermap.org/img/w/${resultFromServer.weather[0].icon}.png`;
  wind.innerHTML = `wind: ${Math.floor(resultFromServer.wind.speed)} m/s`;
  humidity.innerHTML = `humidity: ${resultFromServer.main.humidity} %`;
};
