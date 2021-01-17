class RebutticleData {
    constructor(bias, opinion, url, title) {
        this.title = title;
        this.bias = bias;
        this.opinion = opinion;
        this.url = url;
    }
}

var background = {
    activeRebutticles: [],
    signedIn: false,

    init: function () {
        //temporary local gata

        this.activeRebutticles = [];
        for (i = 0; i < 0; i++) {
            data = new RebutticleData(Math.random() * 10, Math.random() * 10, "http://google.com", "Google" + i)
            this.activeRebutticles.push(data);
        }

        //end


        chrome.runtime.onMessage.addListener(function (request, sender, response) {
            if (request.fn in background) {
                background[request.fn](request, sender, response);
            }
        });

        chrome.tabs.onActivated.addListener(tab => {
            chrome.tabs.get(tab.tabId, tab_info => {
                if (isArticleSource(tab_info.url)) {
                    // generate rebutticle(s)
                    this.addRebutticle({url: tab_info.url, title:tab_info.title}, null, null);
                }
            });
        });

        console.log("finished background init");
    },

    getRebutticles: function (request, sender, response) {
        response(this.activeRebutticles);
    },

    getSignInStatus: function (request, sender, response) {
        response(this.signedIn);
    },

    removeRebutticle: function (request, sender, response) {
        this.activeRebutticles.splice(request.i, 1);
    },

    signIn: function (request, sender, response) {
        console.log("logging in");
        this.signedIn = true;
    },

    addRebutticle: function (request, sender, response) {
        console.log("Tab successfully added");
        data = new RebutticleData(Math.random() * 10, Math.random() * 10, request.url, request.title);
        this.activeRebutticles.push(data);
        
    }
}

background.init();



function isArticleSource(source) {
    console.log(source);
    articleSources = [
        "palmerreport.com",
        "politifact.com",
        "jacobinmag.com",
        "jezebel.com",
        "cbsnews.com",
        "abcnews.go.com",
        "npr.org",
        "nbcnews.com",
        "nytimes.com",
        "stltoday.com",
        "theguardian.com",
        "washingtonpost.com",
        "cnn.com",
        "msnbc.com",
        "vox.com",
        "nbcnews.com",
        "huffpost.com",
        "scmp.com",
        "forbes.com",
        "theskimm.com",
        "cbc.ca",
        "dailyhive.com",
        "thestar.com",
        "theprovince.com",
        "bbc.com",
        "time.com",
        "vox.com",
        "theguardian.com",
        "reuters.com",
        "apnews.com",
        "upi.com",
        "voanews.com",
        "tennessean.com",
        "syracuse.com",
        "economist.com",
        "reviewjournal.com",
        "Forbes.com",
        "ft.com",
        "startribune.com",
        "thehill.com",
        "rasmussenreports.com",
        "wsj.com",
        "christianitytoday.com",
        "atlanticcouncil.org",
        "chicagotribune.com",
        "edmontonsun.com",
        "financialpost.com",
        "fraserinstitute.org",
        "freedomhouse.org",
        "nypost.com",
        "montrealgazette.com",
        "ottawacitizen.com",
        "ottawasun.com",
        "vancouversun.com",
        "nationalpost.com",
        "torontosun.com",
        "calgaryherald.com",
        "theglobeandmail.com",
        "nypost.com",
        "foxnews.com",
        "washingtontimes.com",
        "Beinglibertarian.com",
        "Calgarysun.com",
        "Rebelnews.com",
        "telegraph.co.uk",
        "naturalnews.com",
        "infowars.com",
        "americanthinker.com"
    ];

    for (index in articleSources) {
        if (source.startsWith("http://www." + articleSources[index])
        || source.startsWith("https://www." + articleSources[index])) {
            console.log("Add this one..")
            return true;
        }
    }
    return false;
}