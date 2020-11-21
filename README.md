<p align="center" style="background-color: black; padding:50px"><a href="https://www.cell5.co.uk" target="_blank"><img src="https://www.cell5.co.uk/logo-white.de5d94e5.svg" width="400"></a>

## About The Trial Project

The project is a Game Rental that allows the user to track the games that they have rented out.

This trial project is made using the following technologies:
- **React.JS** (Frontend Framework)
- **Material UI** (React.JS UI Component)
- **Axios** (HTTP client)
- **Laravel 8** (Backend Framework)

It took me 1 day to develop the frontend, 1 day for the backend, 1 day for testing & polishing and 1 day for the **[video presentation](https://youtu.be/ZY5dWY9H6hg)**. I have enjoyed building the application and i have learnt a couple of new things while working on it.

The Web Application itself can Create, Update, Delete, Filter and Sort all with the consideration of being desktop and mobile responsive.

## Setting Up the Dev Environment

To set up the Development Environment, please follow the following:

1. Clone the repo.
2. Add a new database named "game_rental".
3. On the root folder of the cloned respository, find the *.env.example* and rename it to *.env*.
4. On the root folder of the cloned respository, launch a terminal/console.
5. Enter the following commands to the console:
```
npm install
composer install
php artisan key:generate
php artisan migrate:fresh --seed
npm run dev
php artisan serve
```
6. Go to your browser then got to [http://localhost:8000](http://localhost:8000)

That's it, enjoy the app. thank you!
