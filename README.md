Author: Karolina Blumke

Application name: `movie_favourites`

Python version: 3.6


# Installation

## I. Copy the source code

Clone the [git repository](https://github.com/kblumke/movie_favourites):

    $ git clone https://github.com/kblumke/movie_favourites.git

# II. Django part of project

To run the app you must prepare the virtual environment.

1. create Virtualenv

        $ python3 -m venv /path/to/new/virtual/environment

2. activate Virtualenv

        $ source /path/to/new/virtual/environment/bin/activate

    and go to the project folder: `movie_favourites/app/backend`
        
## Instructions below require activated virtualenv!

## III. Install requirements:

Activate virtualenv, go to project folder (`movie_favourites/app/backend`) and run:

    $ pip install -r requirements.txt

## IV. Setting up database

Go to project folder (`movie_favourites/app/backend`) and run:

    $ python manage.py migrate

Create superuser (You will need that user later on to login into React app and to  add User's favourite):

    $ python manage.py createsuperuser

## V. Run server/application:

    $ python manage.py runserver

## VI. Run automatic tests

To run tests go to project folder (`movie_favourites/app/backend`) and run:

    $ python manage.py test


# VII. Setting up frontend part of the project

1. Install curl
    
        $ sudo apt-get install curl

2. Download Node.js
    
        $ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

3. Install Node.js

        $ sudo apt-get install -y nodejs

4. check Node.js and npm installation by commands (version might be ):

        $ node -v
            v6.11.1
        
        $ npm -v
            3.10.10

    Go to project folder: `movie_favourites/app/frontend` and run command:

        $ npm start

    and go to the link given in the terminal (usually http://127.0.0.1:3000/)

# VIII Usage

You can use your Superuser's (or any user's created on Django admin page)
credentials to log into your React app and add your favourite films to Django db. 

## IX. Issues

If you have any issues with my application, please contact me:

Karolina Blumke karolina.blumke@gmail.com e-mail