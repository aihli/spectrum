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

    init: function() {

        this.activeRebutticles = rebutticles;

        chrome.runtime.onMessage.addListener(function(request, sender, response) {
            if (request.fn in background) {
                background[request.fn](request, sender, response);
            }
        });
    },

    getRebutticles: function(request, sender, response) {
        response(this.activeRebutticles);
    }

}