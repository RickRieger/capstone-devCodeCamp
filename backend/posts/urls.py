from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.posts),
    path('<int:pk>', views.posts),
    path('search/<str:query>', views.search_users),
  
]