from rest_framework import serializers
from .models import FriendRequest
from .models import FriendshipStatus

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['id', 'requestor_id', 'requestTo_id', 'dateAndTime']
 
class FriendshipStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['id', 'requestor_id', 'requestTo_id', 'dateAndTime', 'specifier_id', 'status_id'] 