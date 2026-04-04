const BASE_URL = "http://localhost:8080/api";

async function apiRequest(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) options.body = JSON.stringify(body);

  const res = await fetch(BASE_URL + endpoint, options);
  return res.json();
}