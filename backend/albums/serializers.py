from rest_framework import serializers
from authentication.models import User
from .models import Album

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id','username','first_name', 'last_name',]




class AlbumSerializer(serializers.ModelSerializer):
    user = UsersSerializer(read_only=True)
    class Meta:
        model = Album
        fields = ['user', 'album_id', 'title', 'artist', 'image', 'preview']
        depth = 2

