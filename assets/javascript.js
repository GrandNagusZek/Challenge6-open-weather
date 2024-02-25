// declares several variables to store API key, DOM elements, and array for storing search history
var apiKey = "78e753a08d650befa72a539b438a53bf"
var dashboardEl = document.getElementById("dashboard")
var fiveDayEl = document.getElementById("five-day")
var searchInputEl = document.getElementById("search-input")
var searchBtnEl = document.getElementById("search-btn")
var sectionBtnEl=document.getElementById("historyBtn")
var historyArr = JSON.parse(localStorage.getItem("history")) || []

displayHistory()

// This function updates the history buttons in the UI based on the items stored in 'historyArr'
function displayHistory(){
    sectionBtnEl.innerHTML=""
    for(var i=0; i < historyArr.length; i++){
        sectionBtnEl.innerHTML=sectionBtnEl.innerHTML+`
        <button type+"button" class="btn bg-secondary w-100 mx-3 my-1">${historyArr[i]}</button>`
    }
}

function populateData(event){
    var currentButton=event.target
    var cityName=currentButton.textContent
    currentWeather(cityName)
    fiveForecast(cityName)

}

// When a searched city button is clicked, it triggers the 'populateData' function
sectionBtnEl.addEventListener("click", populateData)

// Fetches the current weather data for a given city, updates the UI, and adds the city to 'historyArr'
function currentWeather(cityName) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)

            if(historyArr.includes(data.name)===false){
                historyArr.push(data.name)

                localStorage.setItem("history", JSON.stringify(historyArr) )
                displayHistory() 
            }    


            dashboardEl.innerHTML = `<h3>${data.name} (${dayjs.unix(data.dt).format("MM/DD/YYYY")}) <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""></h3>
       <p>Temp: ${data.main.temp}</p> <p>Feels like: ${data.main.feels_like}</p>
        <p>Wind: ${data.wind.speed} MPH</p>
        <p>Humidity: ${data.main.humidity}%</p>`
        })


}

// Fetches the five day forecast data for a given city and updates the UI with the forecast information
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


// Called when the search button is clicked, it fetches and displays both current weather and the five-day forecast based on the user input.
function search() {
    var cityName = searchInputEl.value
    currentWeather(cityName)
    fiveForecast(cityName)


}

// Listens for a click on the search button and triggers the 'search' function.
searchBtnEl.addEventListener("click", search)