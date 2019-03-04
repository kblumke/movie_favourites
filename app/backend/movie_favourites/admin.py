from django.contrib import admin
from movie_favourites.models import  Film


class FilmAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'year',
        'imdbID',
        'movie_type',
        'poster_url',
    )
    search_fields = ('title',)

admin.site.register(Film, FilmAdmin)

