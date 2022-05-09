from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Album
from .serializers import AlbumSerializer

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_albums(request):
    print('request here damnit')
    albums = Album.objects.filter(user_id=request.user.id)
    serializer = AlbumSerializer(albums, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def user_cars(request):
#     print(
#         'User ', f"{request.user.id} {request.user.email} {request.user.username}")
#     if request.method == 'POST':
#         serializer = CarSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'GET':
#         cars = Car.objects.filter(user_id=request.user.id)
#         serializer = CarSerializer(cars, many=True)
#         return Response(serializer.data)
