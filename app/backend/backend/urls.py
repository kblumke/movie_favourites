from django.contrib import admin
from django.urls import url

urlpatterns = [
    url('admin/', admin.site.urls),
    url('^movies/', include('movie_favourites.urls')),
]
