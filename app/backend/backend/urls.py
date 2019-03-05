from django.contrib import admin
from django.conf.urls import include, url

urlpatterns = [
    url('admin/', admin.site.urls),
    url('^movies/', include('movie_favourites.urls')),
    url('^rest-auth/', include('rest_auth.urls')),
    url('^rest-auth/registration/', include('rest_auth.registration.urls'))
]
