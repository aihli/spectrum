from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.utils.decorators import method_decorator
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.db import Error, OperationalError
from django.db.transaction import atomic
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from psycopg2 import errorcodes
from functools import wraps
import json
import sys
import time
import datetime

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Keywords, Articles, Rebuttals, History
from .watsonnlp import ArticleProcessor

def retry_on_exception(view, num_retries=3, on_failure=HttpResponse(status=500), delay_=0.5, backoff_=1.5):
    @wraps(view)
    def retry(*args, **kwargs):
        delay = delay_
        for i in range(num_retries):
            try:
                return view(*args, **kwargs)
            except OperationalError as ex:
                if i == num_retries - 1:
                    return on_failure
                elif getattr(ex.__cause__, 'pgcode', '') == errorcodes.SERIALIZATION_FAILURE:
                    time.sleep(delay)
                    delay *= backoff_
                else:
                    return on_failure
            except Error as ex:
                return on_failure
    return retry

# /createuser
@method_decorator(csrf_exempt, name='dispatch')
class UserCreate(View):
    @retry_on_exception
    @atomic
    def post(self, request, *args, **kwargs):
        email = request.POST["email"]
        password = request.POST["password"]
        try:
            existing_user = User.objects.get(username=email)
            if existing_user:
                existing_user.set_password(password)
                existing_user.save()
                return HttpResponse(status=202)
        except ObjectDoesNotExist:
            user = User.objects.create_user(email, email, password)
            user.save()
            return HttpResponse(status=201)

# /login
@method_decorator(csrf_exempt, name='dispatch')
class UserLogin(View):
    @retry_on_exception
    @atomic
    def post(self, request, *args, **kwargs):
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(username=email, password=password)
        if user is not None:
            return HttpResponse(status=202)
        else:
            return HttpResponse(status=403)

# /getRebuttalArticles
# {sourceurl:, source leaning: , rebuttals: [url:, title: sentimentscore: leaning]}
@method_decorator(csrf_exempt, name='dispatch')
class Article(View):
    @retry_on_exception
    @atomic
    def post(self, request, *args, **kwargs):
        username = request.POST["email"]
        article = request.POST["article"]
        user = User.objects.get(email=username)
        if user is None:
            return HttpResponse(status=403)
        processor = ArticleProcessor()
        # Make API Calls
        returned_articles, sentiments = processor.getArticles(article)
        article_keywords = processor.nlp.extract_keywords()
        # Create/Fetch Keyword objects
        keyword_objs = []
        for article_keyword in article_keywords:
            obj, created = Keywords.objects.get_or_create(value=article_keyword)
            obj.save()
            keyword_objs.append(obj)
        # Create/Fetch Article object
        article_obj, created = Articles.objects.get_or_create(url=article)
        article_obj.keyword.set(keyword_objs)
        article_obj.save()
        # Create/Fetch Rebuttal Record
        rebuttal_record, created = Rebuttals.objects.get_or_create(user=user, source=article_obj)
        rebuttal_record.rebuttal = list(map(lambda x: x[1], returned_articles))
        rebuttal_record.date = datetime.date.today()
        rebuttal_record.save()
        # Add this to history
        history_record, created = History.objects.get_or_create(
            user=user,
            record=rebuttal_record
        )
        history_record.save()
        responseJSON = {'sourceURL': article,
                        'sourceLeaning': processor.get_leaning(article)}
        itemJSON = []
        for i in range(0, len(returned_articles)):
            item = {'url': returned_articles[i][1],
                    'title': returned_articles[i][0],
                    'sentimentScore': sentiments[i]['sentiment']['document']['score'],
                    'leaning': processor.get_leaning(returned_articles[i][1])}
            itemJSON.append(item)
        responseJSON['rebuttals'] = itemJSON
        return JsonResponse(responseJSON, safe=False)


# /history
# body username
# history: [{article: url, rebuttels: urls}]
@method_decorator(csrf_exempt, name='dispatch')
class HistoryView(View):
    @retry_on_exception
    @atomic
    def post(self, request, *args, **kwargs):
        username = request.POST["username"]
        user = get_object_or_404(User, email=username)
        history_records = History.objects.all().filter(user=user)
        responseJSON = {'history': []}
        for entry in history_records.iterator():
            article_url = entry.record.source.url
            rebuttal_urls = entry.record.rebuttal
            item = {'article': article_url, 'rebuttals': rebuttal_urls}
            responseJSON['history'].append(item)
        return JsonResponse(responseJSON, safe=False)