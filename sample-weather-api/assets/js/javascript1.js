var apiKey = "78e753a08d650befa72a539b438a53bf"
var dashboardEl = document.getElementById("dashboard")
var fiveDayEl = document.getElementById("five-day")
var searchInputEl = document.getElementById("search-input")
var searchBtnEl = document.getElementById("search-btn")
var historyArr = JSON.parse(localStorage.getItem("history")) || []

displayHistory()

function currentWeather(cityName) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)

            if(history.includes(data.name)===false){
                history.pushState(data.name)
            }    


            dashboardEl.innerHTML = `<h3>${data.name} (${dayjs.unix(data.dt).format("MM/DD/YYYY")}) <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""></h3>
       <p>Temp: ${data.main.temp}</p> <p>Feels like: ${data.main.feels_like}</p>
        <p>Wind: ${data.wind.speed} MPH</p>
        <p>Humidity: ${data.main.humidity}%</p>`
        })


}


function fiveForecast(cityName) {
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            fiveDayEl.textContent = ""

            for (var i = 3; i < data.list.length; i = i + 8) {
                var fiveDayArr = data.list
                console.log(fiveDayArr[i])
                var divCol = document.createElement("div")
                divCol.classList = "col-sm-2 mb-3 mb-sm-0"

                var divCard = document.createElement("div")
                divCard.classList = "card"

                var divBody = document.createElement("div")
                divBody.classList = "card-body"

                var h5 = document.createElement("h5")
                h5.classList = "card-title"
                h5.textContent = dayjs.unix(fiveDayArr[i].dt).format("MM/DD/YYYY")
                divBody.appendChild(h5)

                var img = document.createElement("img")
                img.src = "https://openweathermap.org/img/wn/" + fiveDayArr[i].weather[0].icon + "@2x.png"
                divBody.appendChild(img)

                var pTemp = document.createElement("p")
                pTemp.classList = "card-text"
                pTemp.textContent = "Temp: " + fiveDayArr[i].main.temp
                divBody.appendChild(pTemp)
                divCard.appendChild(divBody)
                divCol.appendChild(divCard)

                var pFeelsLike = document.createElement("p")
                pFeelsLike.classList = "card-text"
                pFeelsLike.textContent = "Feels like: " + fiveDayArr[i].main.feels_like
                divBody.appendChild(pFeelsLike)
                divCard.appendChild(divBody)
                divCol.appendChild(divCard)

                var pWind = document.createElement("p")
                pWind.classList = "card-text"
                pWind.textContent = "Wind: " + fiveDayArr[i].wind.speed
                divBody.appendChild(pWind)
                divCard.appendChild(divBody)
                divCol.appendChild(divCard)

                var pHumidity = document.createElement("p")
                pHumidity.classList = "card-text"
                pHumidity.textContent = "Humidity " + fiveDayArr[i].main.humidity
                divBody.appendChild(pHumidity)
                divCard.appendChild(divBody)
                divCol.appendChild(divCard)

                fiveDayEl.appendChild(divCol)


            }


        })
}



function search() {
    var cityName = searchInputEl.value
    currentWeather(cityName)
    fiveForecast(cityName)


}

searchBtnEl.addEventListener("click", search)