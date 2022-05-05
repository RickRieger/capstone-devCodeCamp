from rest_framework import serializers
from .models import FriendshipStatus
from authentication.models import User

class FriendshipStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendshipStatus
        fields = ['id', 'requestor', 'requestTo', 'dateAndTime', 'status'] 

class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id','username',
                  'first_name', 'last_name',)