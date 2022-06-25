//Declarations
const weatherApi = {
    appId: '92355776295363f41baf4ab12795b927',
    baseURL: 'https://api.openweathermap.org/data/2.5/weather?',
}
let locationName = 'Bengaluru'
var units = 'metric';
//All the necessary queries
const body = document.querySelector('body');
const temperature = document.querySelector('.temp-num');
const cityName = document.querySelector('.city-name')
const date = document.querySelector('.date')
const time = document.querySelector('.time')
const form = document.querySelector('form')
const searchBox = document.querySelector('.searchbox')
const currentWeatherDetails = document.querySelector('.current-weather-details-container')
const weatherIcon = document.querySelector('.weather-icon')
const condition = document.querySelector('.condition')
const tempUnits = document.querySelector('.temp-units')
const celsius = document.querySelector('.celsius')
const fahrenheit = document.querySelector('.fahrenheit')
const feelsLike = document.querySelector('#feels-like')
const maxTemp = document.querySelector('#max-temp')
const minTemp = document.querySelector('#min-temp')
const pressure = document.querySelector('#pressure')
const humidity = document.querySelector('#humidity')



// function dataTime(dateArgument) {
//     let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
//     let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

//     let date = dateArgument.getDate()
//     let day = days[dateArgument.getDay()]
//     let month = months[dateArgument.getMonth()]

//     return `${day} ${date}, ${month}`
// }

form.addEventListener('submit', (e) => {

    if (searchBox.value.length === 0) {
        alert('Please enter a city name');
    } else {
        getWeatherData(searchBox.value)
        locationName = searchBox.value
        e.preventDefault();
    }
})

celsius.addEventListener('click', () => {
    fahrenheit.classList.remove('clicked')
    celsius.classList.add('clicked')
    units = 'metric'
    console.log(locationName);
    getWeatherData(locationName)
})
fahrenheit.addEventListener('click', () => {
    celsius.classList.remove('clicked')
    fahrenheit.classList.add('clicked')
    units = 'imperial'
    getWeatherData(locationName)
})

function getWeatherData(locationName) {
    console.log(units);
    let url = `${weatherApi.baseURL}q=${locationName}&units=${units}&appid=${weatherApi.appId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showWeatherData(data)
        })
        .catch(error => {
            alert('City Not Found! Please try again');
            console.log(error)
        })

}



const showWeatherData = (data) => {
    let { feels_like, temp, temp_max, temp_min } = data.main;
    let todayDate = new Date()
    feelsLike.textContent = `${Math.floor(feels_like)}\xB0`
    maxTemp.textContent = `${Math.floor(temp_max)}\xB0`
    minTemp.textContent = `${Math.floor(temp_min)}\xB0`
    cityName.textContent = data.name;
    temperature.textContent = Math.floor(temp);
    condition.textContent = data.weather[0].main;
    // date.textContent = dataTime(todayDate)
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    console.log(data.weather[0].icon);
    if (data.weather[0].icon.includes('n')) {
        if (condition.textContent === 'Clear' || condition.textContent === 'Haze' || condition.textContent === 'Mist') {
            body.style.backgroundImage = `url(./Images/Night/Clear.jpg)`
        } else if (condition.textContent === 'Clouds') {
            body.style.backgroundImage = `url(./Images/Night/Cloudy.jpg)`
        } else if (condition.textContent === 'Rain' || condition.textContent === 'Thunderstorm' || condition.textContent === 'Drizzle') {
            body.style.backgroundImage = `url(./Images/Night/Rainy.jpg)`
        } else if (condition.textContent === 'Snow') {
            body.style.backgroundImage = `url(./Images/Night/Snow.jpg)`
        } else {
            body.style.backgroundImage = `url(./Images/Night/Clear.jpg)`
        }
    } else {
        if (condition.textContent === 'Clear' || condition.textContent === 'Haze' || condition.textContent === 'Mist') {
            body.style.backgroundImage = `url(./Images/Day/Sunny.jpg)`
        } else if (condition.textContent === 'Clouds') {
            body.style.backgroundImage = `url(./Images/Day/Cloudy.jpg)`
        } else if (condition.textContent === 'Rain' || condition.textContent === 'Thunderstorm' || condition.textContent === 'Drizzle') {
            body.style.backgroundImage = `url(./Images/Day/Rainy.jpg)`
        } else if (condition.textContent === 'Snow') {
            body.style.backgroundImage = `url(./Images/Day/Snow.jpg)`
        } else {
            body.style.backgroundImage = `url(./Images/Day/Clear.jpg)`
        }
    }

}

window.onload = () => {
    getWeatherData(locationName);
}