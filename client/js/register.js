async function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
      await apiRequest("/auth/register", "POST", {
        username,
        password,
      });
  
      alert("Registered successfully");
      window.location.href = "index.html";
    } catch (err) {
      alert("Error");
    }
  }