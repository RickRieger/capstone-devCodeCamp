from django.shortcuts import get_object_or_404
from xmlrpc.client import ResponseError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Comments
from .models import Replies
from .serializers import CommentsSerializer
from .serializers import RepliesSerializer

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def comments(request,pk):
    if request.method == 'GET':
        comments = Comments.objects.filter(video = pk)
        serializer = CommentsSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = CommentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'POST'])
@permission_classes([IsAuthenticated])
def comments_details(request,pk=''):
    if(pk != ''):
        comment = get_object_or_404(Comments,pk=pk)
    print(
        'User======================================= ', f"{request.user.id} {request.user.email} {request.user.username}")

    if request.method == 'PUT':
        serializer = CommentsSerializer(comment,data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = CommentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, username = request.user.username)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def replies(request,pk):
    if request.method == 'GET':
        replies = Replies.objects.filter(comment = pk)
        serializer = RepliesSerializer(replies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        comment = get_object_or_404(Comments,pk=pk)
        serializer = RepliesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(comment = comment,user_id = request.user.id)
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        return ResponseError(serializer.errors,status = status.HTTP_400_BAD_REQUEST)    