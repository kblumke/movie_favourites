import json
from json.decoder import JSONDecodeError

from django.shortcuts import render

from rest_framework.generics import GenericAPIView
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated

from movie_favourites.models import Film
from movie_favourites.serializers import FavouritesSerializer


class FavouritesView(APIView):
    """
    Endpoint for managing film favourites.
    """
    serializer_class = FavouritesSerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        """
        Return list of favourite films.
        """
        response_data = []

        all_films = Film.objects.all()

        for film in all_films:
            response_data.append({
                'imdbID': film.imdbID,
                'Poster': film.poster_url,
                'Title': film.title,
                'Year': film.year,
                'Type': film.movie_type,
            })
        return Response(response_data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        """
        Add film favourite.
        """
        try:
            film, _ = Film.objects.get_or_create(
                imdbID=request.data.get('imdbID'),
                poster_url=request.data.get('Poster'),
                title=request.data.get('Title'),
                year=request.data.get('Year'),
                movie_type=Film.TYPE_NAME_VALUE[request.data.get('Type')])
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        """
        Remove movie from favourites.
        """
        try:
            body = request.body.decode('utf-8')
            body = json.loads(body)
            imdbID = body['imdbID']
        except JSONDecodeError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            film = Film.objects.get(imdbID=imdbID)
        except Film.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        film.delete()

        return Response(status=status.HTTP_200_OK)




