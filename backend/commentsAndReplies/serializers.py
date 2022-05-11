from rest_framework import serializers
from .models import Replies
from .models import Comments


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id', 'user_id', 'text', 'likes','dislikes', 'created', 'updated', 'username']
        depth = 1

class RepliesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Replies
        fields = ['id', 'user_id', 'comment', 'text',]
        depth = 1
