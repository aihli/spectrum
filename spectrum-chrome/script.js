
document.addEventListener("DOMContentLoaded", function () {
    app.init();
});

var app = {
    init: function () {
        //============== temporary local data ====================
        class RebutticleData {
            constructor(bias, opinion, indep, url) {
                this.bias = bias;
                this.opinion = opinion;
                this.indep = indep;
                this.url = url;
            }
        }
        
        rebutticles = []
        for (i = 0; i < 10; i++) {
            console.log(Math.random()* 10);
            data = new RebutticleData(Math.random() * 10, Math.random() * 10, Math.random() * 10, "http://google.com")
            rebutticles.push(data);
        }

        //============== end of local data =======================

        let scrollView = document.getElementsByClassName("scroll")[0];

        for (i in rebutticles) {
            data = rebutticles[i];
            scrollView.appendChild(createCard(data.bias, data.opinion, data.indep, data.url));
        }
    }
};




//FUNCTION DEFINITIONS

function createCard(bias, opinion, indep, url) {
    let rebutticleCard = document.createElement("div");
    rebutticleCard.className = "card";
    let dialogueElement = createDialogueElement("Title of rebutticle");
    let scoreDiv = createScoreDiv(bias, opinion, indep);
    let viewButton = createViewButton(url);
    let dismissButton = createDismissButton();
    rebutticleCard.append(dialogueElement, scoreDiv, viewButton, dismissButton);
    return rebutticleCard;
};

function createScoreDiv(bias, opinion, indep) {
    let scoreDiv = document.createElement("div");
    scoreDiv.classList.add("flex-container", "score-container");
    let leftDiv = createAnalyticField(bias.toFixed(1), "Pol. Bias");
    let middleDiv = createAnalyticField(opinion.toFixed(1), "Opinion");
    let rightDiv = createAnalyticField(indep.toFixed(1), "Indep. Score");
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

    return dismissButton;
};

function createDialogueElement(title) {
    let dialogueElement = document.createElement("p");
    dialogueElement.className = "dialogue";
    dialogueElement.innerText = title;

    return dialogueElement;
};