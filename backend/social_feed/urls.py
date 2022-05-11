from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.social_feed),
    path('<int:pk>/', views.social_feed),
]