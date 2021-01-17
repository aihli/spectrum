document.getElementById("loginButton").addEventListener("click", logIn);

function logIn() {
    console.log("Logging out...");
    signedIn = true;
}

function logOut() {
    signedIn = false;
}