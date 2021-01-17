
document.addEventListener("DOMContentLoaded", function () {
    app.init();
});

document.addEventListener("pageshow", function() {
    app.init();
})

var app = {
    init: function () {
        console.log("I'm logged in:" + signedIn);
        renderSignIn();

        let scrollView = document.getElementsByClassName("scroll")[0];

        for (i in rebutticles) {
            data = rebutticles[i];
            scrollView.appendChild(createCard(data.bias, data.opinion, data.indep, data.url, i));
        }
    }
};




//FUNCTION DEFINITIONS

function createCard(bias, opinion, indep, url, index) {
    let rebutticleCard = document.createElement("div");
    rebutticleCard.className = "card";
    let dialogueElement = createDialogueElement("Title of rebutticle");
    let scoreDiv = createScoreDiv(bias, opinion, indep);
    let viewButton = createViewButton(url);
    let dismissButton = createDismissButton();
    rebutticleCard.append(dialogueElement, scoreDiv, viewButton, dismissButton);
    rebutticleCard.id = index;
    return rebutticleCard;
};

function createScoreDiv(bias, opinion, indep) {
    let scoreDiv = document.createElement("div");
    scoreDiv.classList.add("flex-container", "score-container-small");
    let leftDiv = createAnalyticField(bias.toFixed(1), "Pol. Bias");
    let middleDiv = createAnalyticField(opinion.toFixed(1), "Opinion");
    let rightDiv = createAnalyticField(indep.toFixed(1), "Indep. Sc.");
    scoreDiv.append(leftDiv, middleDiv, rightDiv);
    return scoreDiv;
};

function createAnalyticField(score, text) {
    let analyticDiv = document.createElement("div");
    analyticDiv.className = "horizontally-aligned"
    let analyticBox = document.createElement("p");
    analyticBox.className = "analyticBox-small";
    analyticBox.style = "--color: red"; //should change
    analyticBox.innerText = score;
    let analyticSubtitle = document.createElement("p");
    analyticSubtitle.className = "analyticSubtitle";
    analyticSubtitle.innerText = text;
    analyticDiv.append(analyticBox, analyticSubtitle);
    return analyticDiv;
};

function createViewButton(url) {
    let viewButton = document.createElement("a");
    viewButton.setAttribute("href", url);
    viewButton.setAttribute("target", "_blank");
    let embeddedViewButton = document.createElement("button");
    embeddedViewButton.className = "viewButton";
    embeddedViewButton.innerText = "View"
    viewButton.appendChild(embeddedViewButton);

    return viewButton;
};

function createDismissButton() {
    let dismissButton = document.createElement("button");
    dismissButton.className = "dismissButton";
    dismissButton.innerText = "Dismiss";
    dismissButton.onclick = function (btn) {
        let parent = btn.target.parentNode;
        let index = parent.getAttribute('id');
        parent.parentElement.removeChild(parent);
        rebutticles.splice(index,1); //TODO
        console.log(rebutticles);
    };
    return dismissButton;
};

function createDialogueElement(title) {
    let dialogueElement = document.createElement("p");
    dialogueElement.className = "dialogue";
    dialogueElement.innerText = title;

    return dialogueElement;
};

function renderSignIn() {
    let signInLink = document.getElementsByClassName("signIn")[0];
    if (signedIn) {
        
        signInLink.innerText = "Log out";
        signInLink.href = "#";
        signedInLink.onclick = function() {
            signedIn = false;
            renderSignIn();
        };
    } else {
        signInLink.innerText = "Sign in";
        signInLink.href = "signin.html";
        signInLink.onclick = function() {};
    }

    //else the default is what we want
}