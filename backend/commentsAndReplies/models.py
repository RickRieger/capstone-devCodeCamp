from django.db import models
from authentication.models import User




class Comments(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  username = models.CharField(max_length=255)
  user = models.ForeignKey(User, on_delete=models.CASCADE) 
  dislikes = models.IntegerField(default = 0)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)


class Replies(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  comment = models.ForeignKey(Comments, on_delete=models.CASCADE)
  text = models.CharField(max_length=255) 