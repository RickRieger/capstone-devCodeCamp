from rest_framework import serializers
from .models import FriendshipStatus

class FriendshipStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendshipStatus
        fields = ['id', 'requestor', 'requestTo', 'dateAndTime', 'status'] 

