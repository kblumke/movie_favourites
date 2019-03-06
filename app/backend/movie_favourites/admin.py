from django.contrib import admin
from movie_favourites.models import Film, Favourite


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


class FavouriteAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'film',
    )
    search_fields = ('user',)

admin.site.register(Favourite, FavouriteAdmin)