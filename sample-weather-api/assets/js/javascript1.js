var apiKey="78e753a08d650befa72a539b438a53bf"
var dashboardEl=document.getElementById("dashboard")
var fiveDayEl=document.getElementById("five-day")

function currentWeather(cityName){
    var url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)

        dashboardEl.innerHTML=`<h3>${data.name} (${dayjs.unix(data.dt).format("MM/DD/YYYY")}) <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""></h3>
       <p>Temp: ${data.main.temp}</p> <p>Feels like: ${data.main.feels_like}</p>
        <p>Wind: ${data.wind.speed} MPH</p>
        <p>Humidity: ${data.main.humidity}%</p>`
    })


}


function fiveForecast(cityName){
    var url=`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)

        for(var i=3; i < data.list.length; i=i+8){
            var fiveDayArr=data.list
            console.log(fiveDayArr[i])
        }


    })
}

currentWeather('Miami')
fiveForecast('Miami')