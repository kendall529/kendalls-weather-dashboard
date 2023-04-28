var APIKey = '75e4abf9f355e747fc2ff2fafa75a075'

var cityPlaceholder = 'Lawrence'


// I have now switched the API URL that I'm using after reading some class documentation
function searchCity(cityInput) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function(res) {
            if(!res.ok) throw new Error ('Ooops');

            return res.json();
        })
        .then(function(data) {
            return data;
        })
        .catch(function(error) {
            console.error(error);
        })
}

// future task will be to use the queryURL to pull the lon and lat from a search

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityPlaceholder + "&appid=" + APIKey;
fetch(queryURL)
    .then(function(res) {
        if(!res.ok) throw new Error ('Oooops');

        return res.json();
    })
    .then(function(data) {
        console.log('data :>>', data);
    })
    .catch(function(error) {
        console.error(error);
    })

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


function createTodayForecast(today) {
    var timeNow = dayjs().format("MM/DD/YYYY");
    var todayCardEl = document.createElement('div');
    todayCardEl.setAttribute('class', 'card today w-75 position-absolute top-0 end-0 mt-3 me-3');

    var todayCardBody = document.createElement('div');
    todayCardBody.setAttribute('class', 'card-body');

    var todayHeading = document.createElement('h5');
    todayHeading.setAttribute('class', 'card-title');
    todayHeading.textContent = today.name + timeNow + today.weather[0].icon;

    var todayTemp = document.createElement('p');
    todayTemp.setAttribute('class', 'card-text');
    todayTemp.textContent = 'Temp: ' + today.main.temp;

    var todayWind = document.createElement('p');
    todayWind.setAttribute('class', 'card-text');
    todayTemp.textContent = 'Wind: ' + today.wind.speed;

    var todayHumidity = document.createElement('p');
    todayHumidity.setAttribute('class', 'card-text');
    todayTemp.textContent = 'Feels like: ' + today.main.feels_like;

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

createFiveDayForecastContainer();

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

document.getElementById('search-btn').addEventListener('click', function(e) {
    e.preventDefault();
    var inputEl = document.getElementById('search-term');

    if (!inputEl.value.trim()) return;

    // createCityBtn();
    // saveCity();

    // currently there may be a problem with the searchCity function which is causing the .then promise to not be read properly
    searchCity(inputEl.value).then(function(today) {
            createTodayForecast(today);
    });
});

    useCurrentCity();

