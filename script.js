// script.js
const apiKey = '236fa0a9b43d8a32acdc91e8f0ddf7f9';

function fetchWeather() {
    const city = document.getElementById("city").value;
    console.log("User input city:", city);
  
    if (!city) {
      alert("Please enter a city name");
      return;
    }
  
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log("Fetching data from:", apiURL);
  
    fetch(apiURL)
      .then(res => {
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error("City not found or API error");
        return res.json();
      })
      .then(data => {
        console.log("Weather data received:", data);
  
        const main = document.getElementById("mainWeather");
        const details = document.getElementById("weatherDetails");
  
        const tempC = data.main.temp;
        const tempF = (tempC * 9/5 + 32).toFixed(1);
        const now = new Date();
        const options = { hour: 'numeric', minute: '2-digit', hour12: true };
        const formattedTime = now.toLocaleTimeString('en-US', options);
        const formattedDate = now.toLocaleDateString('en-GB');
        const dateTime = `${formattedDate} ${formattedTime}`;

  
        main.innerHTML = `
          <h1>${tempC}°C</h1>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" style="width:80px">
          <div class="data"><p><b>${data.weather[0].description}</b></p></div>
          <div class="data"><p>${dateTime}</p></div>
          <div class="data"><p>${data.name}, ${data.sys.country}</p></div>  
        `;
  
        details.innerHTML = `
          <div class="card wide"><img src="https://img.icons8.com/color/48/temperature.png" width="40"><h3>Temp (°C)</h3><p>${tempC}</p></div>
          <div class="card wide"><img src="https://img.icons8.com/color/48/temperature.png" width="40"><h3>Temp (°F)</h3><p>${tempF}</p></div>
          <div class="card wide"><img src="https://img.icons8.com/fluency/48/hygrometer.png" width="40"><h3>Humidity</h3><p>${data.main.humidity}%</p></div>
          <div class="card wide"><img src="https://img.icons8.com/color/48/barometer-gauge.png" width="40"><h3>Pressure</h3><p>${data.main.pressure} hPa</p></div>
          <div class="card wide"><img src="https://img.icons8.com/ios-filled/50/wind.png" width="40"><h3>Wind Speed</h3><p>${data.wind.speed} m/s</p></div>
          <div class="card wide"><img src="https://img.icons8.com/ios-filled/50/compass.png" width="40"><h3>Wind Deg</h3><p>${data.wind.deg}°</p></div>
        `;
      })
      .catch(err => {
        console.error("Error fetching weather data:", err);
        alert("City not found. Please check the spelling.");
      });
  }
  