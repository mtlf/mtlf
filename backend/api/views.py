from django.http import HttpResponse
from django.shortcuts import render

import json

def recommend_tasks(request):
  return HttpResponse(json.dumps({'hey': 'there'}),
                      content_type="application/json")

