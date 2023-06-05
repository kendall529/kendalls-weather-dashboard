var APIKey = '75e4abf9f355e747fc2ff2fafa75a075'

var cityPlaceholder = 'Lawrence'

https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// I have now switched the API URL that I'm using after reading some class documentation
function searchCity(cityInput) {
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput +  "&appid=" + APIKey;
    fetch(queryURL)
        .then(function(res) {
            if(!res.ok) throw new Error ('Ooops');

            return res.json();
        })
        .then(function(data) {
            console.log('data :>>', data);
            if(data.length > 0) {
                weatherSearch(data);
            }
        })
        .catch(function(error) {
            console.error(error);
        })
};

function weatherSearch(data) {
    var lat = data[0].lat;
    var lon = data[0].lon;

    var weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' +  APIKey;
    console.log(weatherURL);
    fetch(weatherURL)
        .then(function(res) {
            if(!res.ok) throw new Error ('Ooops');

            return res.json();
       })
       .then(function(data) {
            console.log('data :>>', data);
            renderFiveDayForecast(data);
       })
       .catch(function(error) {
            console.error(error);
       })
};

function createTodayForecast(today) {
    var todayCardEl = document.createElement('div');
    todayCardEl.setAttribute('class', 'card today w-75 position-absolute top-0 end-0 mt-3 me-3');

    var todayCardBody = document.createElement('div');
    todayCardBody.setAttribute('class', 'card-body');

    var todayHeading = document.createElement('h5');
    todayHeading.setAttribute('class', 'card-title');
    todayHeading.textContent = today.list[0].dt_txt;

    var iconCode = today.list[0].weather[0].icon;

    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

    var iconImg = document.createElement('img');
    iconImg.src = iconURL;

    var todayTemp = document.createElement('p');
    todayTemp.setAttribute('class', 'card-text');
    todayTemp.textContent = 'Temp: ' + today.list[0].main.temp;

    var todayWind = document.createElement('p');
    todayWind.setAttribute('class', 'card-text');
    todayWind.textContent = 'Wind: ' + today.list[0].wind.speed;

    var todayHumidity = document.createElement('p');
    todayHumidity.setAttribute('class', 'card-text');
    todayHumidity.textContent = 'Feels like: ' + today.list[0].main.feels_like;

    todayCardBody.append(todayHeading, iconImg, todayTemp, todayWind, todayHumidity);


    todayCardEl.append(todayCardBody);

    return todayCardEl;
};

var fiveDayWrapper;

function createFiveDayForecastContainer() {
    fiveDayWrapper = document.createElement('div');
    fiveDayWrapper.setAttribute('class', 'w-75 mt-4 float-end me-4');

    var fiveDayHeading = document.createElement('h3');
    fiveDayHeading.textContent = '5-Day Forecast';

    var fiveDayContainer = document.createElement('div');
    fiveDayContainer.setAttribute('class', 'container');

    var fiveDayRow = document.createElement('div');
    fiveDayRow.setAttribute('class', 'row row-col-auto gap-3');
    fiveDayContainer.append(fiveDayRow);

    var fiveDayCol = document.createElement('div');
    fiveDayCol.setAttribute('class', 'col');
    fiveDayRow.append(fiveDayCol); 

    fiveDayWrapper.append(fiveDayHeading, fiveDayContainer);

    document.body.append(fiveDayWrapper);

    console.log('createFiveDayForecastContainer :>>', fiveDayWrapper);                             /** Delete this before submission */

    return fiveDayWrapper;
};

createFiveDayForecastContainer();

function createFiveDayForecastCard(day, i) {
    var fiveDayCardEl = document.createElement('div');
    fiveDayCardEl.setAttribute('class', 'col');

    var fiveDayBodyEl = document.createElement('div');
    fiveDayBodyEl.setAttribute('class', 'card-body bg-dark');

    var fiveDayHeading = document.createElement('h5');
    fiveDayHeading.setAttribute('class', 'card-title text-light');
    fiveDayHeading.textContent = day.list[i].dt_txt;

    var iconCode = day.list[i].weather[0].icon;

    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

    var iconImg = document.createElement('img');
    iconImg.src = iconURL;

    var fiveDayTemp = document.createElement('p');
    fiveDayTemp.setAttribute('class', 'card-text ps-1 my-3 text-light');
    fiveDayTemp.textContent = 'Temp: ' + day.list[i].main.temp;

    var fiveDayWind = document.createElement('p');
    fiveDayWind.setAttribute('class', 'card-text ps-1 my-3 text-light');
    fiveDayWind.textContent = 'Wind: ' + day.list[i].wind.speed;

    var fiveDayHumidity = document.createElement('p');
    fiveDayHumidity.setAttribute('class', 'card-text ps-1 my-3 text-light');
    fiveDayHumidity.textContent = 'Humidity: ' + day.list[i].main.humidity;

    fiveDayBodyEl.append(fiveDayHeading, iconImg, fiveDayTemp, fiveDayWind, fiveDayHumidity);

    fiveDayCardEl.append(fiveDayBodyEl);

    return fiveDayCardEl;
};

function renderFiveDayForecast(days) {
    console.log('renderFiveDayForecast :>>', fiveDayWrapper);                           /** Delete this before submitting */

    // loop over days
    for(var i = 1; i < 36; i +=8) {
        // create day cards
        var dayCard = createFiveDayForecastCard(days, i);
        // append day cards to forecast container
        fiveDayWrapper.append(dayCard);
    };
};


// create a button from already searched cities
function createCityBtn() {
    var inputEl = document.getElementById('search-term');
    var cityListBodyEl = document.getElementById('city-list')
    var cityBtnEl = document.createElement('button');
    cityBtnEl.setAttribute('class', 'btn bg-secondary-subtle w-100 mt-3');
    cityBtnEl.textContent = inputEl.value;

    inputEl.value = '';

    cityListBodyEl.append(cityBtnEl);
}

document.getElementById('search-btn').addEventListener('click', function(e) {
    e.preventDefault();
    var inputEl = document.getElementById('search-term');

    if (!inputEl.value.trim()) return;

    // createCityBtn();
    // saveCity();

    // currently there may be a problem with the searchCity function which is causing the .then promise to not be read properly
    searchCity(inputEl.value);
    // createTodayForecast();
});


