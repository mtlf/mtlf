from django.conf.urls import patterns, url

from api import views

urlpatterns = patterns('',
  url(r'^recommend_hit_groups$', views.recommend_hit_groups,
      name='recommend_hit_groups'),
  url(r'^feedback$', views.feedback, name='feedback'),
  url(r'^current_task$', views.current_task, name='current_task'),
  url(r'^test$', views.test, name='test')
)
