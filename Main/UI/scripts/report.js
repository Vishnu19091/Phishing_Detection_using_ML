////// Report URL using API \\\\\\
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("report-form");
  const messageBox = document.getElementById("message");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page refresh

    const url = document.getElementById("url").value.trim();
    if (!url) {
      messageBox.textContent = "Please enter a valid URL!";
      messageBox.style.color = "red";
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/report/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: new URLSearchParams({ url }), // Sending in form-urlencoded format
      });

      const data = await response.json();
      messageBox.textContent =
        data.message || "Phishing website reported successfully!";
      messageBox.style.color = response.ok ? "green" : "red";
    } catch (error) {
      console.error("Error:", error);
      messageBox.textContent = "Failed to report URL.";
      messageBox.style.color = "red";
    }

    // Show message and fade out after 3 seconds
    messageBox.style.opacity = "1";
    messageBox.style.transition = "opacity 1s";
    setTimeout(() => {
      messageBox.style.opacity = "0";
    }, 2000); // Wait 2 sec, then fade out in 1 sec

    // Reset message after fade-out completes
    setTimeout(() => {
      messageBox.textContent = "";
      messageBox.style.opacity = "1"; // Reset opacity for next submit
    }, 3000);
  });
});

//////////////////////////////////
