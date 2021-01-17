
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => app.init(), 10)

    updateHeaderScoreDiv(10, 10);
});

document.addEventListener("pageshow", function () {
    app.init();
})

var app = {
    loadedRebutticles: [],

    init: function () {
        //load data froms background
        console.log("begin popup init");
        chrome.runtime.sendMessage({ fn: "getRebutticles" }, function (response) {
            this.loadedRebutticles = response;

            //continue rest of rendering
            renderSignIn();

            let scrollView = document.getElementsByClassName("scroll")[0];

            for (i in loadedRebutticles) {
                data = this.loadedRebutticles[i];
                scrollView.appendChild(createCard(data.bias, data.opinion, data.url, i, data.title));
            }
        });


    }
};

//FUNCTION DEFINITIONS

function createCard(bias, opinion, url, index, title) {
    let rebutticleCard = document.createElement("div");
    rebutticleCard.className = "card";
    let dialogueElement = createDialogueElement(title);
    let scoreDiv = createScoreDiv(bias, opinion);
    let viewButton = createViewButton(url);
    let dismissButton = createDismissButton();
    rebutticleCard.append(dialogueElement, scoreDiv, viewButton, dismissButton);
    rebutticleCard.id = index;
    return rebutticleCard;
};

function updateHeaderScoreDiv(bias, opinion) {
    let myDiv = document.getElementById("header_score_div");
    let children = $(myDiv).children();
    politicalContainer = children[0].getElementsByClassName("analyticBox")[0];
    opinionContainer = children[1].getElementsByClassName("analyticBox")[0];
    
    politicalContainer.classList.add(politicalColor(bias));
    politicalContainer.innerText = bias;

    opinionContainer.classList.add(opinionColor(opinion));
    opinionContainer.innerText = opinion;
}

function createScoreDiv(bias, opinion) {
    let scoreDiv = document.createElement("div");
    scoreDiv.classList.add("flex-container", "score-container-small");
    let leftDiv = createAnalyticFieldPolitical(bias.toFixed(1), "Pol. Bias");
    let rightDiv = createAnalyticFieldOpinion(opinion.toFixed(1), "Opinion");
    scoreDiv.append(leftDiv, rightDiv);
    return scoreDiv;
};

function createAnalyticFieldPolitical(score, text) {
    let analyticDiv = document.createElement("div");
    analyticDiv.className = "horizontally-aligned"
    let analyticBox = document.createElement("p");
    analyticBox.className = "analyticBox-small";
    analyticBox.classList.add(politicalColor(score));
    analyticBox.innerText = score;
    let analyticSubtitle = document.createElement("p");
    analyticSubtitle.className = "analyticSubtitle";
    analyticSubtitle.innerText = text;
    analyticDiv.append(analyticBox, analyticSubtitle);
    return analyticDiv;
};

function createAnalyticFieldOpinion(score, text) {
    let analyticDiv = document.createElement("div");
    analyticDiv.className = "horizontally-aligned"
    let analyticBox = document.createElement("p");
    analyticBox.className = "analyticBox-small";
    analyticBox.classList.add(opinionColor(score));
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
        loadedRebutticles.splice(index, 1); //TODO
        chrome.runtime.sendMessage({ fn: "removeRebutticle", i: index});
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

    chrome.runtime.sendMessage({ fn: "getSignInStatus" }, function (response) {
        if (response) {
            signInLink.innerText = "Log out";
            signInLink.href = "#";
            signedInLink.onclick = function () {
                signedIn = false;
                renderSignIn();
            };
        } else {
            signInLink.innerText = "Sign in";
            signInLink.href = "signin.html";
            signInLink.onclick = function () { };
        }

    });
}

function politicalColor(score) {
    var result = "";
    switch (true) {
        case (score <= (10 / 7)): result = "dark-blue-box"; break;
        case (score <= (20 / 7)): result = "blue-box"; break;
        case (score <= (30 / 7)): result = "light-blue-box"; break;
        case (score <= (40 / 7)): result = "neutral-box"; break;
        case (score <= (50 / 7)): result = "light-red-box"; break;
        case (score <= (60 / 7)): result = "red-box"; break;
        default: result = "dark-red-box"; break;
    }

    return result;
}

function opinionColor(score) {
    return "dark-blue-box";
}
