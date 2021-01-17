
document.addEventListener("DOMContentLoaded", function () {
    app.init();
    updateHeaderScoreDiv(10,10,10);
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
            scrollView.appendChild(createCard(data.bias, data.opinion, data.indep, data.url, i, data.title));
        }
    }
};




//FUNCTION DEFINITIONS

function createCard(bias, opinion, indep, url, index, title) {
    let rebutticleCard = document.createElement("div");
    rebutticleCard.className = "card";
    let dialogueElement = createDialogueElement(title);
    let scoreDiv = createScoreDiv(bias, opinion, indep);
    let viewButton = createViewButton(url);
    let dismissButton = createDismissButton();
    rebutticleCard.append(dialogueElement, scoreDiv, viewButton, dismissButton);
    rebutticleCard.id = index;
    return rebutticleCard;
};

function updateHeaderScoreDiv(bias,opinion,indep) {
    let myDiv = document.getElementById("header_score_div");
    let children = $(myDiv).children();
    politicalContainer = children[0].getElementsByClassName("analyticBox")[0];
    opinionContainer = children[1].getElementsByClassName("analyticBox")[0];
    indepContainer = children[2].getElementsByClassName("analyticBox")[0];

    politicalContainer.style["background-color"] = politicalColor(bias);
    politicalContainer.innerText = bias;

    opinionContainer.style["background-color"] = opinionColor(opinion);
    opinionContainer.innerText = opinion;

    indepContainer.style["background-color"] = independanceColor(indep);
    indepContainer.innerText = indep;
}

function createScoreDiv(bias, opinion, indep) {
    let scoreDiv = document.createElement("div");
    scoreDiv.classList.add("flex-container", "score-container-small");
    let leftDiv = createAnalyticFieldPolitical(bias.toFixed(1), "Pol. Bias");
    let middleDiv = createAnalyticFieldOpinion(opinion.toFixed(1), "Opinion");
    let rightDiv = createAnalyticFieldIndependance(indep.toFixed(1), "Independent");
    scoreDiv.append(leftDiv, middleDiv, rightDiv);
    return scoreDiv;
};

function createAnalyticFieldPolitical(score, text) {
    let analyticDiv = document.createElement("div");
    analyticDiv.className = "horizontally-aligned"
    let analyticBox = document.createElement("p");
    analyticBox.className = "analyticBox-small";
    analyticBox.style = "--color: " + politicalColor(score);
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
    analyticBox.style = "--color: " + opinionColor(score);
    analyticBox.innerText = score;
    let analyticSubtitle = document.createElement("p");
    analyticSubtitle.className = "analyticSubtitle";
    analyticSubtitle.innerText = text;
    analyticDiv.append(analyticBox, analyticSubtitle);
    return analyticDiv;
};

function createAnalyticFieldIndependance(score, text) {
    let analyticDiv = document.createElement("div");
    analyticDiv.className = "horizontally-aligned"
    let analyticBox = document.createElement("p");
    analyticBox.className = "analyticBox-small";
    analyticBox.style = "--color: " + independanceColor(score);
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

function politicalColor(score) {
    r = 160;
    g = 160;
    b = 160;
    if (score <= 5) {
        //red
        //r = 160
        g = 160 * (score/5);
        b = 160 * (score/5);
    } else {
        //blue
        r = 160 * ((10-score)/5);
        g = 30 + 130 * ((10-score)/5);
        //b = 160;
    }

    return "rgb("+r+","+g+","+b+")";
}

function opinionColor(score) {
    r = 200;
    g = 200;
    b = 200;
    if (score <= 5) {
        //green
        r = 40 + 160 * (score/5);
        //g = 200
        b = 200 * (score/5);
    } else {
        //cyan
        r = 200 * ((10-score)/5);
        //g = 200
        b = 200 - 10 * ((10-score)/5);
    }

    return "rgb("+r+","+g+","+b+")";
}

function independanceColor(score) {
    r = 120;
    g = 120;
    b = 120;
    if (score <= 5) {
        //pink
        r = 190 - 70 * (score/5);
        g = 120 * (score/5);
        b = 200 - 80 * (score/5);
    } else {
        //purple
        r = 40 + 80 * ((10-score)/5);
        g = 120 * ((10-score)/5);
        // b = 120
    }

    return "rgb("+r+","+g+","+b+")";
}