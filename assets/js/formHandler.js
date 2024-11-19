document.addEventListener("DOMContentLoaded", () => {
  const userInfoContainer = document.getElementById("user-info-container");
  const gameContent = document.getElementById("game-content");
  const userInfoForm = document.getElementById("user-info-form");

  userInfoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (name && email) {
      // You can send this data to your backend if required.
      localStorage.setItem("userInfo", JSON.stringify({ name, email }));
      console.log("Data saved to localStorage!");
      // Hide the form and show the game content
      userInfoContainer.style.display = "none";
      gameContent.style.display = "block";
    } else {
      alert("Please fill out all fields.");
    }
  });
});
