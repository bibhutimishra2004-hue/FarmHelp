function goToDashboard() {
  window.location.href = "dashboard.html";
}

// async function getMandi() {
//   try {
//     const data = await apiRequest("/mandi");

//     console.log("Mandi Data:", data);

//     displayMandiData(data); // ✅ CALL FUNCTION

//   } catch (err) {
//     console.error(err);
//     document.getElementById("result").innerText =
//       "Error fetching mandi data";
//   }
// }


async function getMandi() {
  try {
    console.log("Button clicked");

    const data = await apiRequest("/mandi");

    console.log("API Data:", data);

    const container = document.getElementById("mandi"); // ✅ FIXED

    container.innerHTML = "";

    if (!data || data.length === 0) {
      container.innerHTML = "No data available";
      return;
    }

    data.slice(0, 5).forEach(item => {
      const card = document.createElement("div");

      card.style.border = "1px solid #ccc";
      card.style.padding = "10px";
      card.style.margin = "10px 0";
      card.style.borderRadius = "8px";

      card.innerHTML = `
        🌾 <b>${item.commodity}</b><br>
        📍 ${item.market}<br>
        💰 ₹${item.modal_price}/quintal<br>
        📉 ${item.min_price} | 📈 ${item.max_price}
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    document.getElementById("mandi").innerText = "Error fetching data";
  }
}

// ✅ KEEP FUNCTION OUTSIDE
function displayMandiData(data) {
  const container = document.getElementById("result");

  if (!container) {
    console.error("Result container not found");
    return;
  }

  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = "No mandi data available";
    return;
  }

  data.slice(0, 5).forEach(item => {
    const card = document.createElement("div");

    card.style.border = "1px solid #ccc";
    card.style.padding = "10px";
    card.style.margin = "10px 0";
    card.style.borderRadius = "8px";

    card.innerHTML = `
      🌾 <b>Commodity:</b> ${item.commodity} <br>
      📍 <b>Market:</b> ${item.market} <br>
      💰 <b>Price:</b> ₹${item.modal_price}/quintal <br>
      📉 Min: ₹${item.min_price} | 📈 Max: ₹${item.max_price}
    `;

    container.appendChild(card);
  });
}