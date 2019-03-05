from rest_framework import serializers

from movie_favourites.models import Film


class FavouritesRequest:
    def __init__(self, title, year, imdbID, movie_type, poster_url):
        self.title = title
        self.year = year
        self.imdbID = imdbID
        self.movie_type = movie_type
        self.poster_url = poster_url


class FavouritesSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255, required=True)
    year = serializers.CharField(max_length=4, required=True)
    imdbID = serializers.CharField(max_length=12, required=True)
    movie_type = serializers.IntegerField(required=True)
    poster_url = serializers.CharField(max_length=128, required=True)

    def create(self, validated_data):
        return FavouritesSerializer(**validated_data)