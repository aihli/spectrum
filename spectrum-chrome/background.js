chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, tab_info => {
        if (true) {
            // generate rebutticle(s)
            // notify user + change icon
            console.log(tab_info);
            chrome.storage.local.set({"update": "true"});
            //createCard(5, 5, 5, tab_info.url, 100, tab_info.title)
        }
    });
});

var background = {
    activeRebutticles: [],
    signedIn : false,

    init: function() {
        //temporary local gata

        class RebutticleData {
            constructor(bias, opinion, url, title) {
                this.title = title;
                this.bias = bias;
                this.opinion = opinion;
                this.url = url;
            }
        }
        
        this.activeRebutticles = [];
        for (i = 0; i < 10; i++) {
            data = new RebutticleData(Math.random() * 10, Math.random() * 10, "http://google.com", "Google" + i)
            this.activeRebutticles.push(data);
        }
        
        //end


        chrome.runtime.onMessage.addListener(function(request, sender, response) {
            if (request.fn in background) {
                background[request.fn](request, sender, response);
            }
        });

          console.log("finished background init");
    },

    getRebutticles: function(request, sender, response) {
        response(this.activeRebutticles);
    },

    getSignInStatus: function(request, sender, response) {
        response(this.signedIn);
    },

    removeRebutticle: function(request, sender, response) {
        this.activeRebutticles.splice(request.i, 1);
    },

    signIn: function(request, sender, response) {
        console.log("logging in");
        this.signedIn = true;
    }
}

background.init();