from django.db import models
from django.contrib.auth.models import User

class Film(models.Model):
    """
    Films model.
    """
    MOVIE = 1 
    SERIES = 2
    EPISODE = 3
    GAME = 4
    TYPE_CHOICES = (
        (MOVIE, 'movie'),
        (SERIES, 'series'),
        (EPISODE, 'episode'),
        (GAME, 'game'))

    TYPE_NAME_VALUE = {name: size for size, name in TYPE_CHOICES}
    TYPE_VALUE_NAME = {size: name for size, name in TYPE_CHOICES}

    title = models.CharField(max_length=128)
    year = models.CharField(max_length=4)
    imdbID = models.CharField(max_length=12, unique=True)
    movie_type = models.PositiveIntegerField(choices=TYPE_CHOICES)
    poster_url = models.CharField(max_length=128)
    
    def __str__(self):
        return self.title


class Favourite(models.Model):
    """
    Favourite model.
    """
    film = models.ForeignKey(
        'Film', models.PROTECT, null=True, blank=True, default=None)
    user = models.ForeignKey(
        User, models.PROTECT, null=True, blank=True, default=None)