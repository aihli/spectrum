from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.utils.decorators import method_decorator
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.db import Error, OperationalError
from django.db.transaction import atomic
from django.core.exceptions import ObjectDoesNotExist
from psycopg2 import errorcodes
from functools import wraps
import json
import sys
import time

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
                return HttpResponse(status=200)
        except ObjectDoesNotExist:
            user = User.objects.create_user(email, email, password)
            user.save()
            return HttpResponse(status=200)

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
            return HttpResponse(status=201)
        else:
            return HttpResponse(status=403)

# /getRebuttalArticles
@method_decorator(csrf_exempt, name='dispatch')
class Article(View):
    @retry_on_exception
    @atomic
    def post(self, request, *args, **kwargs):
        user = request.POST["email"]
        article = request.POST["article"]
        if user is None:
            return HttpResponse(status=403)
        processor = ArticleProcessor()
        articles, sentiments = processor.getArticles(article)


@method_decorator(csrf_exempt, name='dispatch')
class HistoryView(View):
    def get(self, request, id=None, *args, **kwargs):
        return JsonResponse(products, safe=False)

    @retry_on_exception
    @atomic
    def post(self, request, *args, **kwargs):
        return HttpResponse(status=200)
