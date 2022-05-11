from django.shortcuts import get_object_or_404
from xmlrpc.client import ResponseError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import SocialFeed
from .serializers import SocialFeedSerializer



@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def social_feed(request, pk=''):
    if request.method == 'GET':
        feed = SocialFeed.objects.all()
        serializer = SocialFeedSerializer(feed, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':     
        post = get_object_or_404(SocialFeed, pk=pk) 
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


