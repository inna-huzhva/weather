const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateWeatherHtml = (cityDetails, weather) => {
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;
};

const updateIcons = (weather) => {
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  const timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  time.setAttribute("src", timeSrc);
};

const showCard = () => {
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateUI = (data) => {
  const { cityDetails, weather } = data;
  updateWeatherHtml(cityDetails, weather);
  updateIcons(weather);
  showCard();
};

cityForm.addEventListener("submit", e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  forecast.getForecast(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forecast.getForecast(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
