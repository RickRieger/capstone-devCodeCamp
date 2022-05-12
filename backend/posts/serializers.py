from rest_framework import serializers
from .models import Post
from authentication.models import User

class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id','username','first_name', 'last_name',]

class PostSerializer(serializers.ModelSerializer):
    user = UsersSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ['id','post','user','album_id', 'track_id', 'album_title','track_title', 'artist_name', 'album_image', 'preview_track']
        depth = 1

