import tldextract
from googleapiclient.discovery import build

google_api_key = "AIzaSyB96bmjyoPDa-xx3uK6N30kk8vJbtva6FA"

class GoogleSearch:
    source_url = ""
    source_domain = ""

    cse_service = build("customsearch", "v1", developerKey=google_api_key)
    cse_resource = cse_service.cse()

    def get_source_domain(self, source):
        ext = tldextract.extract(source)
        self.source_domain = '.'.join([ext.domain, ext.suffix])
        return self.source_domain
    
    def search(self, query, count=10):
        request = self.cse_resource.list(
            q=query,
            cx='5402c345af06ad911',
            num = count
        )
        results = request.execute()
        print(results)
        articles_array = []
        try:
            for item in results['items']:
                print(item['title'])
                print(item['link'])
                articles_array.append([item['title'], item['link']])
        except:
            print("Search returned no articles")
            pass
        return articles_array
    
    def build_request(self, keywords, sites):
        keyword_arg = " OR ".join(map(lambda kw: "allintext:" + kw, keywords))
        sites_arg = " OR ".join(map(lambda site: "site:" + site, sites))
        return " ".join([keyword_arg, sites_arg])


# g = GoogleSearch()
# # g.search('allintext:Trudeau site:reuters.com', count=10)
# q = g.build_request(["trudeau", "federal government", "international travel"], ["reuters.com", "cnn.com", "wsj.com"])
# g.search(q, 3)
