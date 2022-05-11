from django.db import models
from authentication.models import User
from commentsAndReplies.models import Comments, Replies

class SocialFeed(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  album_id = models.IntegerField(unique=True)
  track_id = models.IntegerField(unique=True)
  album_title = models.CharField(max_length=255)
  track_title = models.CharField(max_length=255)
  artist_name = models.CharField(max_length=255)
  album_image = models.CharField(max_length=255)
  preview_track = models.CharField(max_length=255)
  comments = models.ForeignKey(Comments, on_delete=models.CASCADE, default=None)
  replies = models.ForeignKey(Replies, on_delete=models.CASCADE, default=None)