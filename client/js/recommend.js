async function getRecommendation() {
    try {
      const region = document.getElementById("region").value;
      const soil = document.getElementById("soil").value;
      const weather = document.getElementById("weather").value;
      const season = document.getElementById("season").value;
  
      if (!region || !soil || !weather || !season) {
        alert("Please fill all fields");
        return;
      }
  
      const data = await apiRequest("/recommend", "POST", {
        region,
        soil,
        weather,
        season
      });
  
      console.log("Response:", data);
  
const container = document.getElementById("result");
container.innerHTML = "";

data.crops.forEach(crop => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h3>${crop.name}</h3>
    <p><b>Sowing:</b> ${crop.sowing}</p>
    <p><b>Harvest:</b> ${crop.harvest}</p>
    <p><b>Why:</b> ${crop.reason}</p>
  `;

  container.appendChild(card);
});  
    } catch (err) {
      console.error(err);
      document.getElementById("result").innerText = "Error fetching recommendation";
    }
  }