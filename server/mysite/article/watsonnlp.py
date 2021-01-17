import json, time
import random

from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features, CategoriesOptions, ConceptsOptions, EmotionOptions, EntitiesOptions, KeywordsOptions, SentimentOptions, FeaturesResultsMetadata

from .generator import GoogleSearch

# authenticator = IAMAuthenticator('9Q8EOeltPlk4l2un8nGPEztLGTDHaCIv3O4Cu_LE-bYV')
# natural_language_understanding = NaturalLanguageUnderstandingV1(
#     version='2020-08-01',
#     authenticator=authenticator
# )

# natural_language_understanding.set_service_url('https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/d2bd4d44-0619-4d63-b444-fd10127330ce')

# features = Features(
#     categories=CategoriesOptions(limit=3), 
#     concepts=ConceptsOptions(limit=3),
#     emotion=EmotionOptions(targets=['liberal']),
#     entities=EntitiesOptions(sentiment=True, emotion=True, limit=3),
#     keywords=KeywordsOptions(sentiment=True, emotion=True, limit=3)
# )

# response = natural_language_understanding.analyze(
#     url='https://www.cbc.ca/news/politics/trudeau-flight-ban-possible-1.5874905',
#     features=features
# ).get_result()

# print(json.dumps(response, indent=2))
extreme_left = ["palmerreport.com", "politifact.com"]
left = ["jacobinmag.com", "jezebel.com"]
center_left = ["cbsnews.com", "abcnews.go.com", "npr.org", "nbcnews.com", "nytimes.com", "stltoday.com", "theguardian.com", 
                "washingtonpost.com", "cnn.com", "msnbc.com", "vox.com", "nbcnews.com", "huffpost.com", "scmp.com",
                "forbes.com", "theskimm.com", "cbc.ca", "dailyhive.com", "thestar.com", "theprovince.com", "bbc.com", "time.com", "Vox.com", "theguardian.com"]
center = ["reuters.com", "apnews.com", "upi.com", "voanews.com", "tennessean.com", "syracuse.com", "economist.com",
        "reviewjournal.com", "forbes.com", "startribune.com"]
center_right = ["thehill.com", "rasmussenreports.com", "wsj.com", "christianitytoday.com", "atlanticcouncil.org", 
        "atlanticcouncil.org", "chicagotribune.com", "edmontonsun.com", "financialpost.com", "fraserinstitute.org",
        "freedomhouse.org", "nypost.com", "montrealgazette.com", "ottawacitizen.com", "ottawasun.com", "vancouversun.com", "nationalpost.com", "torontosun.com", 
        "calgaryherald.com", "theglobeandmail.com"]
right = ["nypost.com", "foxnews.com", "washingtontimes.com", "beinglibertarian.com", "calgarysun.com", "rebelnews.com", "telegraph.co.uk"]
extreme_right = ["naturalnews.com", "infowars.com", "breitbart.com"]
all_url_dict = {"extreme_left": extreme_left, "left": left, "center_left": center_left, "center": center, "center_right": center_right, "right": right, "extreme_right": extreme_right}

class WatsonNLP():
    authenticator = IAMAuthenticator('9Q8EOeltPlk4l2un8nGPEztLGTDHaCIv3O4Cu_LE-bYV')
    natural_language_understanding = NaturalLanguageUnderstandingV1(
        version='2020-08-01',
        authenticator=authenticator
    )
    natural_language_understanding.set_service_url('https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/d2bd4d44-0619-4d63-b444-fd10127330ce')
    source = ''
    source_keywords = {}
    source_entities = {}
    relevance_threshold = 0.6

    def analyze_article(self, url):
        features = Features(
            entities=EntitiesOptions(sentiment=True, emotion=True, limit=20),
            keywords=KeywordsOptions(sentiment=True, emotion=True, limit=20),
            sentiment=SentimentOptions(),
            metadata={}
        )
        start = time.time()
        response = self.natural_language_understanding.analyze(
            url=url,
            features=features
        ).get_result()
        # print(json.dumps(response, indent=2))
        print(time.time() - start)
        self.source = url
        self.source_entities = response['entities']
        self.source_keywords = response['keywords']
        self.process_response(response)

    def process_response(self, response):
        # print(response)
        filtered_keywords = []
        for keyword in self.source_keywords:
            try:
                if keyword["relevance"] > self.relevance_threshold:
                    filtered_keywords.append(keyword)
            except KeyError:
                pass
        self.source_keywords = filtered_keywords

    def extract_keywords(self, keywords=None):
        if keywords is None:
            keywords = self.source_keywords
        r_array = []
        for keyword in keywords:
            r_array.append(keyword["text"])
        return r_array

    def reduce_keywords(self, count=1):
        for i in range(count):
            if len(self.source_keywords) <= 1:
                return False
            else:
                self.source_keywords.pop()
        return True
    
    def compare_sentiment(self, newArticle):
        keywords = self.extract_keywords()
        features = Features(
            sentiment=SentimentOptions()
        )
        start = time.time()
        response = self.natural_language_understanding.analyze(
            url=newArticle,
            features=features
        ).get_result()
        print(time.time() - start)
        print(json.dumps(response, indent=2))
        return response


class ArticleProcessor():
    nlp = WatsonNLP()
    g = GoogleSearch()
    google_results = []

    def get_leaning(self, source):
        domain = self.g.get_source_domain(source)
        for name, urls in all_url_dict.items():
            if any(domain in url for url in urls):
                return name
        print("None detected")
        return None

    def get_search_urls(self, source):
        leaning = self.get_leaning(source)
        r_list = []
        if leaning is None:
            r_list = center_right + right + center_left + left + center
        if leaning == "left" or leaning == "center_left" or leaning == "extreme_left":
            r_list = center_right + right
        if leaning == "right" or leaning == "center_right" or leaning == "extreme_right":
            r_list = center_left + left
        if leaning == "center":
            r_list = center_right + right + center_left + left
        random.shuffle(r_list)
        return r_list

    def getArticles(self, source):
        self.nlp.analyze_article(source)
        going = True
        while going:
            query = self.g.build_request(keywords=self.nlp.extract_keywords(), sites=self.get_search_urls(source))
            print("#####################")       
            print(query)
            results = self.g.search(query=query, count=5)
            if len(results) == 0:
                going = self.nlp.reduce_keywords()
            else:
                break
        print("#####################")       
        print(results)
        sentiments = []
        for result in results:
            sentiments.append(self.nlp.compare_sentiment(result[1]))
        return results, sentiments


# processor = ArticleProcessor()
# processor.getArticles('https://www.newsmax.com/michaeldorstewitz/vote-fraud-baseless-merit-scotus/2021/01/02/id/1003982/')
