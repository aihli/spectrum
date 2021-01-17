import json, time
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

from ibm_watson.natural_language_understanding_v1 import Features, CategoriesOptions, ConceptsOptions, EmotionOptions, EntitiesOptions, KeywordsOptions, SentimentOptions, FeaturesResultsMetadata

from generator import GoogleSearch

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

class WastonNLP():
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
    
    def comp_sentiment(self, newArticle):
        keywords = self.extract_keywords()
        features = Features(
            sentiment=SentimentOptions(targets=keywords),
            emotion=EmotionOptions(targets=keywords)
        )
        start = time.time()
        response = self.natural_language_understanding.analyze(
            url=newArticle,
            features=features
        ).get_result()
        print(time.time() - start)
        print(json.dumps(response, indent=2))


    def extract_keywords(self, keywords=None):
        if keywords is None:
            keywords = self.source_keywords
        r_array = []
        for keyword in keywords:
            r_array.append(keyword["text"])
        return r_array

    def reduce_keywords(self, count):
        for i in range(count):
            if len(self.source_keywords) <= 1:
                return False
            else:
                self.source_keywords.pop()
        return True


nlp = WastonNLP()
nlp.analyze_article('https://www.cbc.ca/news/politics/trudeau-flight-ban-possible-1.5874905')

g = GoogleSearch()
q = g.build_request(keywords=nlp.extract_keywords(), sites=['reuters.com', 'forbes.com'])
g.search(query=q, count=3)
print("blah")