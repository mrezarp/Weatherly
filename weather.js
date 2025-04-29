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
let time = document.querySelector("#time")
let timeState = document.querySelector("#time-state")
let loading = document.querySelector("#loading")


function nToDay(day) {
    if (day == 0) {
        return "Sunday"
    } else if (day == 1) {
        return "Monday"
    } else if (day == 2) {
        return "Tuesday"
    } else if (day == 3) {
        return "Wednesday"
    } else if (day == 4) {
        return "Thursday"
    } else if (day == 5) {
        return "Friday"
    } else if (day == 6) {
        return "Saturday"
    }
}
function nToMonth(month) {
    if (month == 0) {
        return "January"
    } else if (month == 1) {
        return "February"
    } else if (month == 2) {
        return "March"
    } else if (month == 3) {
        return "April"
    } else if (month == 4) {
        return "May"
    } else if (month == 5) {
        return "June"
    } else if (month == 6) {
        return "July"
    } else if (month == 7) {
        return "August"
    } else if (month == 8) {
        return "September"
    } else if (month == 9) {
        return "October"
    } else if (month == 10) {
        return "November"
    } else if (month == 11) {
        return "December"
    }
}
town.addEventListener("input", () => {
    getData(town.value)
})

async function getData(location) {
    try {
        let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ed41fdcdd1b377996e242e1b22a33065&units=metric`)
        loading.style = "display:none"
        imperial.addEventListener("click", () => {
            metricValue.checked = false
            imperialValue.checked = true
            temp.textContent = `${Math.round(data.main.temp * 1.8 + 32)}°`;
            wind.textContent = `${(data.wind.speed * 2.23694).toFixed(2)} mph`
            loading.style = "display:flex"
            setTimeout(() => {
                loading.style = "display:none"

            }, 1000);
        });

        metric.addEventListener("click", () => {
            metricValue.checked = true
            imperialValue.checked = false
            temp.textContent = `${Math.round(data.main.temp)}°`;
            wind.textContent = `${data.wind.speed} m/s`;
            loading.style = "display:flex"
            setTimeout(() => {
                loading.style = "display:none"

            }, 1000);
        });
        imperialValue.checked = false
        metricValue.checked = true
        
        let animationSrc = `weather-icon/${data.weather[0]["icon"]}.lottie`
        icon.load(animationSrc)

        temp.textContent = `${Math.round(data.main.temp)}°`;
        wind.textContent = `${data.wind.speed} m/s`;
        humidity.textContent = `${data.main.humidity} %`;
        description.textContent = data.weather[0]["main"];
        city.textContent = data.name;

        let curentDate = new Date();
        date.textContent = `${nToDay(curentDate.getDay())} ${curentDate.getDate()} ${nToMonth(curentDate.getMonth())} ${curentDate.getFullYear()}`;

    } catch (error) {
        console.log(error);
    }
}
getData(town.value);


