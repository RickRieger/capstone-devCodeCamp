from functools import partial
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .serializers import FriendshipStatusSerializer
from .models import FriendshipStatus
from authentication.serializers import UsersSerializer
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
    print(serializer.data['requestor'])
    if request.data['status'] == 'Accepted':
      userThatSentFriendRequest = User.objects.filter(serializer.data['requestor'])
    return Response(serializer.data,status=status.HTTP_200_OK)
  if request.method == 'GET':

    friendIds = FriendshipStatus.objects.filter(requestor = request.user.id).filter(status = 'accepted') | FriendshipStatus.objects.filter(requestTo = request.user.id).filter(status = 'accepted').exclude()
    serializer = FriendshipStatusSerializer(friendIds, many=True)
    return Response(serializer.data)

    # allFriends = User.objects.filter(FriendshipStatus.objects.)
    # serializer = UsersSerializer(allFriends, many=True)
    # return Response(serializer.data)
    
  return Response(status=status.HTTP_400_BAD_REQUEST)
  
    
 
    
  
  