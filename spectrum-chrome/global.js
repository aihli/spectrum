class RebutticleData {
    constructor(bias, opinion, indep, url, title) {
        this.title = title;
        this.bias = bias;
        this.opinion = opinion;
        this.indep = indep;
        this.url = url;
    }
}

rebutticles = []
for (i = 0; i < 10; i++) {
    console.log(Math.random()* 10);
    data = new RebutticleData(Math.random() * 10, Math.random() * 10, Math.random() * 10, "http://google.com", "Google" + i)
    rebutticles.push(data);
}

filteredURLS = ["http://google.com"]

signedIn = false;

console.log("hi")