from django.urls import path, include
from albums import views



urlpatterns = [
    path('', views.get_all_albums),

]
