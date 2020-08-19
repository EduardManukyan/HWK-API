const username = document.getElementById("username");
const password = document.getElementById("password");
const button = document.getElementById("login");


const usernameValid = () => {
  return username.value === username.value.trim();
};

const passwordValid = () => {
  return password.value.trim().length > 4;
};



const login = () => {
  if (usernameValid() && passwordValid()) {
    window.location = "../home-page/home-page.html";
    // console.log(window.location = "/home-page.html")
  }
};



window.onload = () => {
  if (button) {
    button.addEventListener("click", () => {
      login();
    });
  }
};

