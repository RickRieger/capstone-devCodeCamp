from django.shortcuts import get_object_or_404
from xmlrpc.client import ResponseError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Post
from .serializers import PostSerializer



@api_view(['GET', 'DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def posts(request, pk=''):
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        feed = Post.objects.all()
        serializer = PostSerializer(feed, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':     
        post = get_object_or_404(Post, pk=pk) 
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


