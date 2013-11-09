from django.db import models

# Create your models here.
class Worker(models.Model):
  worker_id = models.CharField(max_length=100)

  
class HitGroup(models.Model):
  group_id = models.CharField(max_length=100)
  last_updated = models.DateTimeField()
  details = models.TextField()


class CompletionHistory(models.Model):
  FEEDBACK = (
    ('Y', 'yea'),
    ('N', 'nay'),
  )
  worker = models.ForeignKey(Worker)
  group = models.ForeignKey(HitGroup)
  feedback = models.CharField(max_length=1, choices=FEEDBACK, null=True)
  

class Requester(models.Model):
  requester_id = models.CharField(max_length=100)
