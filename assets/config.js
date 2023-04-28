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

        // renderFiveDayForecast(data);
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


// cannot get this part to work no matter what I try
// ideally this would pull the lon and lat from the geolocator api
// what's coming out are NaN values
function locateLonLat() {
    var inputEl = document.getElementById('search-term').value.trim();
    var geoLocatorUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=;' + 'Lawrence' + '&limit=5&appid=75e4abf9f355e747fc2ff2fafa75a075'
    fetch(geoLocatorUrl)
        .then(function(res) {
            if(!res.ok) throw new Error ('Ooops');

            return res.json();
        })
        .then(function(data) {


            var lat = parseFloat(data.lat);
            var lon = parseFloat(data.lon);

            lat = lat.toString();
            lon = lon.toString();

            console.log(data.lat, data.lon);


        });
}
// acquire city from local storage function
function useCurrentCity() {
    var currentCity = JSON.parse(localStorage.getItem('cityList'));

    if (currentCity) {
        cityList = currentCity;
    } else {
        cityList = [];
    }
}

// store city to local storage
function saveToLocalStorage() {
    localStorage.setItem('currentCity', city);
    cityList.push(city);
    localStorage.setItem('cityList', JSON.stringify(cityList));
}

// function to take a city from the search and only store it in local storage if it wasn't previously listed
function saveCity() {
    city = document.getElementById('search-term');
    if (!(city && cityList.includes(city))) {
        saveToLocalStorage();
        return city;
    } else {
        return;
    }
}

locateLonLat();


function createTodayForcast(today) {
    var timeNow = moment().format("l");
    var todayCardEl = document.createElement('div');
    todayCardEl.setAttribute('class', 'card today w-75 position-absolute top-0 end-0 mt-3 me-3');

    var todayCardBody = document.createElement('div');
    todayCardBody.setAttribute('class', 'card-body');

    var todayHeading = document.createElement('h5');
    todayHeading.setAttribute('class', 'card-title');
    todayHeading.textContent = today.name + timeNow + today.weather.icon;

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

function createFiveDayForecastContainer() {
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

function searchCity() {
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=38.97&lon=-95.23&appid=75e4abf9f355e747fc2ff2fafa75a075'

    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=38.97&lon=-95.23&appid=75e4abf9f355e747fc2ff2fafa75a075'

    fetch(forecastUrl)
    .then(function(res) {
        if (!res.ok) throw new Error('oops')
        return res.json();
    })
    .then(function(data) {
        console.log('results :>> ', data);
        renderFiveDayForecast(data);
    })
    .catch(function(error) {
        console.log(error);
    });   

    fetch(weatherUrl)
    .then(function(res) {
        if (!res.ok) throw new Error('oops')
        return res.json();
    })
    .then(function(data) {
        console.log('results :>> ', data);
        createTodayForcast(data);
    })
    .catch(function(error) {
        console.log(error);
    });   
}

document.getElementById('search-btn').addEventListener('click', function(e) {
    e.preventDefault();
    var inputEl = document.getElementById('search-term');

    if (!inputEl.value.trim()) return;

    createCityBtn();
    saveCity();
    searchCity();


    // fetchFiveDayForecastResults(inputEl.value).then(function(days) {
    //     renderFiveDayForecast(days);
    // });
});

    useCurrentCity();

