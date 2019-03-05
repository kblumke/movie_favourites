"""Define urls."""
from django.conf.urls import url
from movie_favourites.views import FavouritesView

urlpatterns = [
    url(r'^favourites/?$', FavouritesView.as_view(), name='favourites'),
]
