document.getElementById("loginButton").addEventListener("click", logIn);

function logIn() {
    console.log("Logging out...");
    
    chrome.runtime.sendMessage({fn: "signOut"});
}
