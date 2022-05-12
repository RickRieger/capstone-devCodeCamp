from django.shortcuts import get_object_or_404
from xmlrpc.client import ResponseError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Post
from .serializers import PostSerializer
from friends.models import FriendshipStatus
from authentication.models import User
from posts.serializers import UsersSerializerFriend


@api_view(['GET', 'DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def posts(request, pk=''):
    print('====ok====')    
    print('======', request.data)
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        friendIds = FriendshipStatus.objects.filter(requestor = request.user.id).filter(status = 'accepted') | FriendshipStatus.objects.filter(requestTo = request.user.id).filter(status = 'accepted').only('requestor', 'requestTo')
        # Brett
        postFeedIds = []
        for item in friendIds:
            if item.requestor == request.user:
               postFeedIds.append(item.requestTo.id)
            elif item.requestTo == request.user:
               postFeedIds.append(item.requestor.id)
        postFeedIds.append(request.user.id)      
        feed = Post.objects.filter(user_id__in=postFeedIds)
        serializer = PostSerializer(feed, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'DELETE': 
        post = get_object_or_404(Post, pk=pk) 
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






