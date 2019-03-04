from django.db import models


class Film(models.Model):
    """
    Films model
    """
    MOVIE = 'movie' 
    SERIES = 'series'
    EPISODE = 'episode'
    GAME = 'game'
    TYPE_CHOICES = (
        (MOVIE, 'movie'),
        (SERIES, 'series'),
        (EPISODE, 'episode'),
        (GAME, 'game'))

    title = models.CharField(max_length=128)
    year = models.CharField(max_length=4)
    imdbID = models.CharField(max_length=12, unique=True)
    movie_type = models.PositiveIntegerField(choices=TYPE_CHOICES)
    poster_url = models.CharField(max_length=128)
    
    def __str__(self):
        return self.title


        