let myApiCode = "ed41fdcdd1b377996e242e1b22a33065"
let currentWeatherData = null
let imperial = document.querySelector("#imperial")
let imperialValue = document.querySelector("#imperial input")
let metric = document.querySelector("#metric")
let metricValue = document.querySelector("#metric input")
let temp = document.querySelector("#temp")
let wind = document.querySelector("#wind")
let humidity = document.querySelector("#humidity")
let icon = document.querySelector("#icon")
let description = document.querySelector("#description")
let city = document.querySelector("#city")
let date = document.querySelector("#date")
let town = document.querySelector("#town")
let loading = document.querySelector("#loading")
let searchSuggestions = document.querySelector("#search-suggestions")
let searchBtn = document.querySelector("#search")
function nToDay(day) {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day]
}
function nToMonth(month) {
    return [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ][month]
}

async function getSuggestions(location) {
    try {
        let { data } = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${myApiCode}`)
        return data
    } catch (err) {
        console.log(err)
        loading.style.display = "none"
    }
}

async function getWeather(cityName) {
    try {
        loading.style.display = "flex"
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myApiCode}&units=metric`)
        loading.style.display = "none"
        currentWeatherData = data
        updateUI(data)
    } catch (err) {
        console.log(err)
        loading.style.display = "none"
    }
}
function updateUI(data) {
    icon.load(`src/weather-icon/${data.weather[0]["icon"]}.lottie`)
    temp.textContent = `${Math.round(data.main.temp)}°`
    wind.textContent = `${data.wind.speed} m/s`
    humidity.textContent = `${data.main.humidity} %`
    description.textContent = data.weather[0]["main"]
    city.textContent = data.name
    const curentDate = new Date()
    date.textContent = `${nToDay(curentDate.getDay())} ${curentDate.getDate()} ${nToMonth(curentDate.getMonth())} ${curentDate.getFullYear()}`
}


window.addEventListener("click" , ()=>{
    searchSuggestions.style.display = "none"
})


town.addEventListener("input", async () => {
    const suggestions = await getSuggestions(town.value)
    searchSuggestions.style.display = "flex"
    searchSuggestions.textContent = ""
    if(!town.value){
        searchSuggestions.style.display = "none"
    }
    
    suggestions.forEach(suggest => {
        const suggestCity = document.createElement("span")
        suggestCity.className = `cursor-pointer hover:bg-background-offwhite px-4 rounded-xl w-full py-2 el`
        suggestCity.textContent = `${suggest.name}, ${suggest.country}`
        searchSuggestions.appendChild(suggestCity)
    })
})

searchSuggestions.addEventListener("click", (e) => {
    let clickedItem = e.target.closest(".el")
    if (!clickedItem) return
    searchSuggestions.style.display = "none"
    let cityName = clickedItem.textContent.split(",")[0]
    getWeather(cityName)
})

imperial.addEventListener("click", () => {
    if (!currentWeatherData) return
    imperialValue.checked = true
    metricValue.checked = false
    temp.textContent = `${Math.round(currentWeatherData.main.temp * 1.8 + 32)}°`
    wind.textContent = `${(currentWeatherData.wind.speed * 2.23694).toFixed(2)} mph`
})

metric.addEventListener("click", () => {
    if (!currentWeatherData) return
    imperialValue.checked = false
    metricValue.checked = true
    temp.textContent = `${Math.round(currentWeatherData.main.temp)}°`
    wind.textContent = `${currentWeatherData.wind.speed} m/s`
})
getWeather(town.value)
