function goToDashboard() {
  window.location.href = "dashboard.html";
}

async function getWeather() {
  const city = document.getElementById("city").value.trim();

  if (!city) {
    alert("Enter city");
    return;
  }

  try {
    // Call backend API
    const data = await fetch(`http://localhost:8080/api/weather/${city}`)
      .then((res) => res.json());

    console.log("Weather data:", data);

    displayWeather(data);
  } catch (err) {
    console.error("Error fetching weather:", err);
    document.getElementById("weather").innerHTML =
      "Error fetching weather data";
  }
}

// ✅ Safe rendering function
function displayWeather(data) {
  const container = document.getElementById("weather");

  if (!data || !data.city || !data.list || data.list.length === 0) {
    container.innerHTML = "No weather data available for this city";
    return;
  }

  const current = data.list[0];

  container.innerHTML = `
    <div style="border:1px solid #ccc; padding:15px; border-radius:10px; margin-top:10px;">
      <h3>🌤 Weather in ${data.city.name}, ${data.city.country}</h3>
      <p>🌡️ Temperature: ${current.main?.temp ?? "N/A"} °C</p>
      <p>☁️ Condition: ${current.weather?.[0]?.description ?? "N/A"}</p>
      <p>💧 Humidity: ${current.main?.humidity ?? "N/A"}%</p>
      <p>🌬️ Wind: ${current.wind?.speed ?? "N/A"} m/s</p>
      <p>📅 Forecast time: ${current.dt_txt ?? "N/A"}</p>
    </div>
  `;
}