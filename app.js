let api = {
    key: '993351b3163b9e7de03df599ab709db3',
    baseUrl: 'https://api.openweathermap.org/data/2.5/'
}

let input = document.querySelector('.search-bar');
input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        getResults(input.value.trim())
        console.log(input.value.trim());
    }
})

document.querySelector('.btn-search').onclick = () => {
    getResults(input.value.trim())
}

function getResults(city) {
    fetch(`${api.baseUrl}weather?q=${city}&lang=vi&units=metric&appid=${api.key}`)
        .then((response) => {
            if (!response.ok) {
                alert('No City Found')
            }
            return response.json()
        })
        .then(displayWeather)
}

function displayWeather(data) {
    console.log(data);

    let city = document.querySelector('.weather__city');
    city.innerHTML = `${data.name}, ${data.sys.country}`

    let temp = document.querySelector('.weather__temp');
    temp.innerHTML = `${Math.floor(data.main.temp)} <span>°C</span>`
    let tempImg = document.querySelector('.icon');
    tempImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`

    let description = document.querySelector('.weather__description')
    description.innerHTML = `${data.weather[0].main}`

    let humidity = document.querySelector('.weather__humidity .color-main')
    humidity.innerHTML = `: ${data.main.humidity}<span>%</span>`

    let speed = document.querySelector('.weather__win .speed');
    speed.innerHTML = `: ${data.wind.speed}<span>Km/h</span>`

    document.querySelector('.weather').classList.remove('loading');

    // document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.name})`

    input.value = ''
}