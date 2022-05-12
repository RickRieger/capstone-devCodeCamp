from django.urls import path, include
from friends import views

urlpatterns = [
   path('', views.friend_request),
   path('pending', views.friend_request_pending),
   path('<int:pk>', views.friend_request),
   path('get-all-users', views.get_all_users),
   path('search/<str:query>', views.search_users),
]
