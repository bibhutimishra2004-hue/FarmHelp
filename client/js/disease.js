function goToDashboard() {
  window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("imageInput");
  const previewText = document.getElementById("filePreview");

  if (fileInput && previewText) {
    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        previewText.innerHTML = `✅ Selected: <span style="color:var(--accent-glow)">${fileInput.files[0].name}</span>`;
      } else {
        previewText.innerHTML = "No file selected";
      }
    });
  }
});

async function uploadImage() {
  const fileInput = document.getElementById("imageInput");
  const resultBox = document.getElementById("result");

  if (!fileInput.files[0]) {
    alert("Please select an image");
    return;
  }

  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  // Show loader
  resultBox.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <div class="loader-spinner"></div>
      <span style="color:var(--accent-glow);">[Model Running] Uploading and analyzing tensor data...</span>
    </div>
  `;

  try {
    // Simulated fetch or real fetch
    const res = await fetch("http://localhost:8080/api/disease", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    resultBox.innerText = "> " + data.result;

  } catch (err) {
    console.error(err);
    resultBox.innerHTML = "<span style='color:#ef4444;'>[Error] Failed to analyze image. Ensure backend is running.</span>";
  }
}