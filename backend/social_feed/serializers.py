from rest_framework import serializers
from .models import SocialFeed



class SocialFeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialFeed
        fields = ['user','album_id', 'track_id', 'album_title','track_title', 'artist_name', 'album_image', 'preview_track', 'comments', 'replies' ]
        depth = 1

