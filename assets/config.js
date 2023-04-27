// var weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=51.50&lon=-0.12&exclude=minutely,alerts&appid=75e4abf9f355e747fc2ff2fafa75a075'

var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=38.97&lon=-95.23&appid=75e4abf9f355e747fc2ff2fafa75a075'

var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=38.97&lon=-95.23&appid=75e4abf9f355e747fc2ff2fafa75a075'


var geoLocatorUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=Lawrence&limit=5&appid=75e4abf9f355e747fc2ff2fafa75a075'

fetch(weatherUrl)
    .then(function(res){
        if(!res.ok) throw new Error ('Oooops');

        return res.json();
    })
    .then(function(data) {
        
        console.log('data :>>', data);

        var dump = document.createElement('pre');
        dump.textContent = JSON.stringify(data, null, 2);
        document.body.appendChild(dump);
    })
    .catch(function(error) {
        console.log(error);
    });

fetch(forecastUrl)
    .then(function(res){
        if(!res.ok) throw new Error ('Oooops');

        return res.json();
    })
    .then(function(data) {
        
        console.log('data :>>', data);

        renderFiveDayForecast(data);
    })
    .catch(function(error) {
        console.log(error);
    });

fetch(geoLocatorUrl)
    .then(function(res) {
        if(!res.ok) throw new Error ('Oooops');

        return res.json();
    })
    .then(function(data) {
        console.log('data :>>', data);

    })
    .catch(function(error) {
        console.log(error);
    });

function createTodayForcast(today) {
    var todayCardEl = document.createElement('div');
    todayCardEl.setAttribute('class', 'card today w-75 position-absolute top-0 end-0 mt-3 me-3');

    var todayCardBody = document.createElement('div');
    todayCardBody.setAttribute('class', 'card-body');

    var todayHeading = document.createElement('h5');
    todayHeading.setAttribute('class', 'card-title');
    todayHeading.textContent = today.name + today.dt + today.weather.icon;

    var todayTemp = document.createElement('p');
    todayTemp.setAttribute('class', 'card-text');
    todayTemp.textContent = 'Temp: ' + today.main.temp;

    var todayWind = document.createElement('p');
    todayWind.setAttribute('class', 'card-text');
    todayTemp.textContent = 'Wind: ' + today.wind.speed;

    var todayHumidity = document.createElement('p');
    todayHumidity.setAttribute('class', 'card-text');
    todayTemp.textContent = 'Humidity: ' + today.main.humidity;

    todayCardBody.append(todayHeading, todayTemp, todayWind, todayHeading);


    todayCardEl.append(todayCardBody);

    return todayCardEl;
};

function createFiveDayForcastContainer() {
    var fiveDayWrapper = document.createElement('div');
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

    return fiveDayWrapper;
}

function createFiveDayForecastCard(day) {
    var fiveDayCardEl = document.createElement('div');
    fiveDayCardEl.setAttribute('class', 'col');

    var fiveDayBodyEl = document.createElement('div');
    fiveDayBodyEl.setAttribute('class', 'card-body bg-dark');

    var fiveDayHeading = document.createElement('h5');
    fiveDayHeading.setAttribute('class', 'card-title text-light');
    fiveDayHeading.textContent = day.list.dt + day.list.weather.icon;

    var fiveDayTemp = document.createElement('p');
    fiveDayTemp.setAttribute('class', 'card-text ps-1 my-3 text-light');
    fiveDayTemp.textContent = 'Temp: ' + day.list.main.temp;

    var fiveDayWind = document.createElement('p');
    fiveDayWind.setAttribute('class', 'card-text ps-1 my-3 text-light');
    fiveDayWind.textContent = 'Wind: ' + day.list.wind.speed;

    var fiveDayHumidity = document.createElement('p');
    fiveDayHumidity.setAttribute('class', 'card-text ps-1 my-3 text-light');
    fiveDayHumidity.textContent = 'Humidity: ' + day.list.main.humidity;

    fiveDayBodyEl.append(fiveDayHeading, fiveDayTemp, fiveDayWind, fiveDayHumidity);

    fiveDayCardEl.append(fiveDayBodyEl);

    return fiveDayCardEl;
}

function renderFiveDayForecast(days) {
    // loop over days
    for(var i = 0; i < 5; i++) {
        // create day cards
        var dayCard = createFiveDayForecastCard(days[i]);
        // append day cards to forecast container
        fiveDayWrapper.append(dayCard);
    }
}

function fetchFiveDayForecastResults(city) {
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=';
    var API_KEY = '&appid=75e4abf9f355e747fc2ff2fafa75a075'

    return fetch(forecastUrl +  + '&lon=' +  + API_KEY);
    .then(function (res) {
        if (!res.ok) throw new Error('Ooops');

        console.log('res :>> ', res);

        return res.json();
      })
      .then(function (data) {
        return data;
      })
      .catch(function (error) {
        console.error(error);
      });
}

document.getElementById('search-btn').addEventListener('click', function() {
    var inputEl = document.getElementById('search-term');

    if (!inputEl.ariaValueMax.trim()) return;

    fetchFiveDayForecastResults(inputEl.value).then(function(days) {
        renderFiveDayForecast(days);
    });
});
