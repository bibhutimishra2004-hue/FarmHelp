// 🔐 Protect page
if (!localStorage.getItem("token")) {
    alert("Please login first");
    window.location.href = "index.html";
  }
  
  // 👤 Load user info
  function loadUser() {
    const username = localStorage.getItem("username");
    document.getElementById("username").innerText = username || "Farmer";
  }
  
  loadUser();
  
  // 🔁 Navigation functions
  function goToRecommend() {
    window.location.href = "recommend.html";
  }
  
  function goToMandi() {
    window.location.href = "mandi.html";
  }
  
  function goToHome() {
    window.location.href = "home.html";
  }

  function checkWeather() {
    window.location.href = "weather.html";
  }

  function goToDisease() {
    window.location.href = "disease.html";
  }
  
  // 🚪 Logout function
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("Logged out");
    window.location.href = "index.html";
  }