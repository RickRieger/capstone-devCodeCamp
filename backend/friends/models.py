from django.db import models
from django.conf import settings
from django.utils import timezone
from authentication.models import User

class FriendList(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user")
  friends = models.ManyToManyField(User, blank=True, related_name="friends")

  def __str__(self):
    return self.user.username

  def add_friend(self, account):
    if not account in self.friends.all():
      self.friends.add(account)
      # self.save()

  def remove_friend(self, account):
    if account in self.friends.all():
      self.friends.remove(account) 

  def unfriend(self, removee):
    remover_friends_list = self
    remover_friends_list.remove_friend(removee)

    friends_list = FriendList.objects.get(user=removee)
    friends_list.remove_friend(self.user)

  def is_mutual_friend(self, friend):
    if friend in self.friends.all():
      return True
    return False

class FriendRequest(models.Model):
  sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender", null=True)
  receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="receiver", null=True)
  is_active = models.BooleanField(blank=True, null=False, default=True)
  timestamp = models.DateTimeField(auto_now_add=True, null=True)

  def accept(self):
    receiver_friend_list = FriendList.objects.get(user=self.receiver)
    if receiver_friend_list:
      receiver_friend_list.add_friend(self.sender)
      sender_friend_list = FriendList.objects.get(user=self.sender)
      if sender_friend_list:
        sender_friend_list.add_friend(self.receiver)
        self.is_active = False
        self.save()

  def decline(self):
    self.is_active = False
    self.save()

  def cancel(self):
    self.is_active = False  
    self.save()




















# ##ORIGIONAL MODELS
# class StatusCode(models.Model):
#   REQUESTED = 'R'
#   ACCEPTED = 'A'
#   DECLINED = 'D'
#   BLOCKED = 'B'
#   STATUS = [
#     (REQUESTED, 'requested'),
#     (ACCEPTED, 'accepted'), 
#     (DECLINED, 'declined'),
#     (BLOCKED, 'blocked'),
#     ]
#   status = models.CharField(max_length=1,
#   choices=STATUS,
#   default=REQUESTED)

# class FriendRequest(models.Model):
#   requestor = models.ForeignKey(User, related_name="requestor", on_delete=models.CASCADE)
#   requestTo = models.ForeignKey(User, related_name="requestTo", on_delete=models.CASCADE)
#   dateAndTime = models.DateTimeField(auto_now=True)


# class FriendshipStatus(models.Model):
#   requestor = models.ForeignKey(User, related_name="requestor_status", on_delete=models.CASCADE)
#   requestTo = models.ForeignKey(User, related_name="requestTo_status", on_delete=models.CASCADE)
#   dateAndTime = models.DateTimeField(auto_now=True)
#   status = models.ForeignKey(StatusCode, on_delete=models.CASCADE)
#   specifier = models.ForeignKey(User, on_delete=models.CASCADE)

