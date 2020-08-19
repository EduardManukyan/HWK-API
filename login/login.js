
const loginBox = document.querySelector(".login-box")
const textBox = document.querySelector(".textbox")
const inputName = document.querySelector(".input-name")
const inputPass = document.querySelector(".input-pass")
const butt = document.querySelector("but")
const username = document.getElementById('username');
const password = document.getElementById('password');

window.onload = () => {
    const loginElement = document.getElementById("login");
    if (loginElement) {
        loginElement.addEventListener("click", () => {
            login();
        });
    }
}

const login = () => {
    if (usernameValid() && passwordValid()) {
        window.location = "./index.html";
    }
    else {
    }
}

const usernameValid = () => {
    return username.value === username.value.trim();
}

const passwordValid = () => {
    return password.value.trim().length > 4;
}



