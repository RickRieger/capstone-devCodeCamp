from django.db import models
from authentication.models import User

class StatusCode(models.Model):
  REQUESTED = 'R'
  ACCEPTED = 'A'
  DECLINED = 'D'
  BLOCKED = 'B'
  STATUS = [
    (REQUESTED, 'requested'),
    (ACCEPTED, 'accepted'), 
    (DECLINED, 'declined'),
    (BLOCKED, 'blocked'),
    ]
  status = models.CharField(max_length=1,
  choices=STATUS,
  default=REQUESTED)

class FriendRequest(models.Model):
  requestor = models.ForeignKey(User, related_name="requestor", on_delete=models.CASCADE)
  requestTo = models.ForeignKey(User, related_name="requestTo", on_delete=models.CASCADE)
  dateAndTime = models.DateTimeField(auto_now=True)


class FriendshipStatus(models.Model):
  requestor = models.ForeignKey(User, related_name="requestor_status", on_delete=models.CASCADE)
  requestTo = models.ForeignKey(User, related_name="requestTo_status", on_delete=models.CASCADE)
  dateAndTime = models.DateTimeField(auto_now=True)
  status = models.ForeignKey(StatusCode, on_delete=models.CASCADE)
  specifier = models.ForeignKey(User, on_delete=models.CASCADE)

