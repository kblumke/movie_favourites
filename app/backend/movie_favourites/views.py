from django.shortcuts import render

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

from movie_favourites import Film

class Favourites(GenericAPIView):
    """
    Endpoint for managing film favourites.
    """
    def get(self, request, format=None):
        """
        Return list of favourite films.
        """
        response_data = []

        all_films = Film.objects.all()

        for film in all_films:
            response_data.append(
                'imdbID': film.imdbID,
                'Poster': film.poster_url,
                'Title': film.title,
                'Year': film.year,
                'Type': film.movie_type,
            )
        return Response(response_data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        """
        Add film favourite.
        """
        film, _ = Film.get_or_create(
            imdbID=request.data.get('imdbID'),
            poster_url=request.data.get('Poster'),
            title=request.data.get('Title'),
            year=request.data.get('Year'),
            movie_type=request.data.get('Type'),
        )

        return Response(status=status.HTTP_200_OK)

    def delete(self, request, format=None)
        """
        Remove movie from favourites.
        """
        imdbID = request.data.get('imdbID')
        try:
            film = Film.get(imdbID=imdbID)
            film.delete()
        except Film.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_200_OK)




