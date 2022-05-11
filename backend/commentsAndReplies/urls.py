from django.urls import path, include
from . import views



urlpatterns = [
    path('', views.comments_details),
    path('<str:pk>/', views.comments),
    path('update/<int:pk>/', views.comments_details),
    path('replies/<int:pk>/', views.replies),
  
]