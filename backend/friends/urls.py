from django.urls import path, include
from friends import views

urlpatterns = [
   path('', views.friend_request),
   path('<int:pk>', views.friend_request),
]
