from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

import json
import random

@require_http_methods(["GET", "POST"])
def recommend_hit_groups(request):
  """
  Requests are of the form:
    {'msg':
      { 'worker_id': 'XXX',
        'sort_order': '[cost|most_hosts|...]',
        [OPTIONAL] 'current_hit_group': 'XXX',
        'available_groups':
          [{'group_id': 'XXX',
            'requester_id': 'XXX',
            'available_hits': 55,
            'reward': .02,
            'name': 'XXX',
            'description': 'XXX',
            'time_allotted': time_in_minutes,
            'expiration_date': time_in_minutes,
            'keywords': ['list', 'of', 'keywords']
            }]
      }
    }
  
  Response if of the form:
    {
      'suggested_groups': ['best_group_id', ..., 'worst_group_id']
    }
  """
  msg = request.REQUEST['msg']
  available_groups = json.loads(msg)['available_groups']
  random.shuffle(available_groups)
  response = {'suggested_groups': [ag['group_id'] for ag in available_groups]}
  return HttpResponse(json.dumps(response),
                      content_type="application/json")


def feedback(request):
  """
  Requests are of the form:
  {
    'group_id' : 'XXX',
    'worker_id' : 'XXX',
    'vote': ['yea'|'nay']
  }

  Returns:
    {
      'status' : 'OK'
    }
  """
  return HttpResponse(json.dumps({'status': 'OK'}),
                      content_type="application/json")


def current_task(request):
  """
  Requests are of the form:
    {
      'worker_id': 'XXX'
      'group_id': 'XXX'
    }

  Returns:
    {
      'status' : 'OK'
    }    
  """
  pass


def test(request):
  return render(request, 'api/test.html')
