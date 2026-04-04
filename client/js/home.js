if (!localStorage.getItem("token")) {
    alert("Please login first");
    window.location.href = "index.html";
  }



async function loadWeather() {
    try {
      const data = await apiRequest("/weather/Delhi");
      document.getElementById("weather").innerText =
        JSON.stringify(data.list?.[0], null, 2);
    } catch (err) {
      document.getElementById("weather").innerText = "Weather not available";
    }
  }
  
  async function loadMandi() {
    try {
      const data = await apiRequest("/mandi");
  
      const container = document.getElementById("mandi");
      container.innerHTML = "";
  
      (data.records || []).slice(0, 5).forEach(item => {
        const div = document.createElement("div");
        div.innerText = `${item.commodity} - ₹${item.modal_price}`;
        container.appendChild(div);
      });
    } catch (err) {
      console.log(err);
    }
  }
  
//   async function getRecommend() {
//     const data = await apiRequest("/recommend", "POST", {
//       region: "Punjab",
//       soil: "loamy",
//       weather: "moderate",
//       season: "rabi",
//     });
  
//     document.getElementById("recommend").innerText = data.result;
//   }

function goToRecommend() {
    window.location.href = "recommend.html";
  }


  function logout() {
    localStorage.removeItem("token");
    alert("Logged out");
    window.location.href = "index.html";
  }

  
  // Load on start
  loadWeather();
  loadMandi();