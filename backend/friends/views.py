from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import FriendList
# from .serializers import FriendRequestSerializer
# from .serializers import FriendshipStatusSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def friend_request(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
      serializer = FriendRequestSerializer()
    
    
    
    
  
    return Response(serializer.data)