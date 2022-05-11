from django.db import models
from authentication.models import User


class Post(models.Model):
  post = models.CharField(max_length=255)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  album_id = models.IntegerField()
  track_id = models.IntegerField()
  album_title = models.CharField(max_length=255)
  track_title = models.CharField(max_length=255)
  artist_name = models.CharField(max_length=255)
  album_image = models.CharField(max_length=255)
  preview_track = models.CharField(max_length=255)

 