"""Test for models and views."""
import json

from django.db import IntegrityError
from django.contrib.auth.models import User
from django.test import TestCase

from rest_framework.test import APIClient

from movie_favourites.models import Film, Favourite
from movie_favourites.views import FavouritesView


class ItemModelTest(TestCase):
    """Test Film model."""

    def test_string_representation(self):
        """Test string representation of model."""
        entry = Film.objects.create(
            imdbID='a1kjnj', 
            poster_url='Poster', 
            title='Title',
            year='Year',
            movie_type=1,
        )
        self.assertEqual(str(entry), entry.title)

    def test_film_imdbID_must_be_unique(self):
        """Test that imdbID must be unique."""
        Film.objects.create(
            imdbID='a1kjnj', 
            poster_url='Poster', 
            title='Title',
            year='Year',
            movie_type=1,
        )
        with self.assertRaises(IntegrityError):
            Film.objects.create(
                imdbID='a1kjnj', 
                poster_url='Poster2', 
                title='Title2',
                year='Year2',
                movie_type=1,
            )


class ViewsTest(TestCase):
    """Test views."""

    def setUp(self):
        """Set up Request factory."""
        self.user = User.objects.create(username='user', password='p@ssw0rd')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.client.login(username=self.user.username, passwrod=self.user.password)

    def prepare_data(self):
        """Prepare test data."""
        film1 = Film.objects.create(
            imdbID='a1kjnj', 
            poster_url='Poster', 
            title='Title',
            year='Year',
            movie_type=1,
        )

        film2 = Film.objects.create(
            imdbID='a1kjnj2', 
            poster_url='Poster2', 
            title='Title2',
            year='Year',
            movie_type=2,
        )

        film3 = Film.objects.create(
            imdbID='a1kjnj3', 
            poster_url='Poster3', 
            title='Title3',
            year='Year',
            movie_type=3,
        )
        for i in [film1, film2, film3]:
            Favourite.objects.create(user=self.user, film=i)

    def test_list_active_items_response(self):
        """Test that list of active items is returned."""
        self.prepare_data()

        response = self.client.get('/movies/favourites')

        resp = [
            {
                'Poster': 'Poster',
                'Title': 'Title',
                'Type': 1,
                'Year': 'Year',
                'imdbID': 'a1kjnj'
            },
            {
                'Poster': 'Poster2',
                'Title': 'Title2',
                'Type': 2,
                'Year': 'Year',
                'imdbID': 'a1kjnj2'
            },
            {
                'Poster': 'Poster3',
                'Title': 'Title3',
                'Type': 3,
                'Year': 'Year',
                'imdbID': 'a1kjnj3'
            }
        ]
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, resp)

    def test_adding_favourite(self):
        self.assertEqual(len(Film.objects.all()), 0)
        data = {
            'Poster': 'Poster',
            'Title': 'Title',
            'Type': 'movie',
            'Year': 'Year',
            'imdbID': 'a1kjnj'
        }
        response = self.client.post('/movies/favourites', data)
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(len(Film.objects.all()), 0)

    def test_adding_favourite_failed(self):
        self.assertEqual(len(Film.objects.all()), 0)
        data = {
            'Poster': 'Poster',
            'Title': 'Title',
            'Type': 'movies',
            'Year': 'Year',
            'imdbID': 'a1kjnj'
        }
        response = self.client.post('/movies/favourites', data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(len(Film.objects.all()), 0)

    def test_deleting_film_from_favourites(self):
        self.prepare_data()
        self.assertEqual(len(Favourite.objects.filter(user=self.user)), 3)
        data = {
            'imdbID': 'a1kjnj'
        }
        response = self.client.delete('/movies/favourites', data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Favourite.objects.filter(user=self.user)), 2)

    def test_deleting_and_film_does_not_exist(self):
        self.prepare_data()

        self.assertEqual(len(Favourite.objects.filter(user=self.user)), 3)
        data = {
            'imdbID': 'a1kjnj111'
        }
        response = self.client.delete('/movies/favourites', data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(len(Favourite.objects.filter(user=self.user)), 3)
