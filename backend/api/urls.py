from django.conf.urls import patterns, url

from api import views

urlpatterns = patterns('',
  url(r'^recommend_tasks$', views.recommend_tasks, name='recommend_tasks')
)
