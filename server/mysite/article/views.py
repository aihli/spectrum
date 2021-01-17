from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.utils.decorators import method_decorator
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.db import Error, OperationalError
from django.db.transaction import atomic
from psycopg2 import errorcodes
from functools import wraps
import json
import sys
import time

from .models import *

# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class Article(View):
    def get(self, request, id=None, *args, **kwargs):
        return JsonResponse(products, safe=False)

    @retry_on_exception
    @atomic
    def post(self, request, *args, **kwargs):
        return HttpResponse(status=200)


@method_decorator(csrf_exempt, name='dispatch')
class HistoryView(View):
    def get(self, request, id=None, *args, **kwargs):
        return JsonResponse(products, safe=False)

    @retry_on_exception
    @atomic
    def post(self, request, *args, **kwargs):
        return HttpResponse(status=200)
