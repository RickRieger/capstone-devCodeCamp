from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .serializers import FriendshipStatusSerializer
from .serializers import UsersSerializer
from .models import FriendshipStatus
from authentication.models import User


@api_view(['POST', 'PATCH', 'GET'])
@permission_classes([IsAuthenticated])
def friend_request(request, pk=''):
  print('User', f"{int(request.user.id)} {request.user.email} {request.user.username}")       
  if request.method == 'POST':
    serializer = FriendshipStatusSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)      
  if request.method == 'PATCH':
    friend_request = get_object_or_404(FriendshipStatus, pk=pk)
    serializer = FriendshipStatusSerializer(friend_request, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    userThatSentFriendRequest = User.objects.filter(id=1)
    print(serializer.data['requestor'])
    return Response(serializer.data,status=status.HTTP_200_OK)
  if request.method == 'GET':
    friendIds = FriendshipStatus.objects.filter(requestor = request.user.id).filter(status = 'accepted') | FriendshipStatus.objects.filter(requestTo = request.user.id).filter(status = 'accepted').only('requestor', 'requestTo')
    # Brett
    friends = []
    for item in friendIds:
      if item.requestor == request.user:
        friends.append(item.requestTo)
      elif item.requestTo == request.user:
        friends.append(item.requestor)
    serializer = UsersSerializer(friends, many=True)
    # for item in serializer.data:
    #   print(item)
    return Response(serializer.data,status=status.HTTP_200_OK)   
  return Response(status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friend_request_pending(request):
  if request.method == 'GET':
    friendIds = FriendshipStatus.objects.filter(requestor = request.user.id).filter(status = 'requested') | FriendshipStatus.objects.filter(requestTo = request.user.id).filter(status = 'requested').only('requestor', 'requestTo')
    pendingFriendsSerializer = FriendshipStatusSerializer(friendIds, many=True)
    friends = []
    for item in friendIds:
      if item.requestor == request.user:
        friends.append(item.requestTo)
      elif item.requestTo == request.user:
        friends.append(item.requestor)
    serializer = UsersSerializer(friends, many=True)
    return Response(pendingFriendsSerializer.data, status=status.HTTP_200_OK)   
  return Response(status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request):
  if request.method == 'GET':
    allUsersExceptLoggedIn = User.objects.all().exclude(id = request.user.id).exclude(username = "admin")
    serializer = UsersSerializer(allUsersExceptLoggedIn, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  return Response(status=status.HTTP_400_BAD_REQUEST)
  
  