document.getElementById("loginButton").addEventListener("click", logIn);

function logIn() {
    chrome.runtime.sendMessage({fn: "signIn"});
}
