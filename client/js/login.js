async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
      const data = await apiRequest("/auth/login", "POST", {
        username,
        password,
      });
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);

      window.location.href="dashboard.html";
      
  
      alert("Login success");
      window.location.href = "dashboard.html";
    } catch (err) {
      alert("Login failed");
    }
  }