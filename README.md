
# Movie App

A movie discovery and display web application that allows users to explore, search, and view information about movies using the Movie Database (TMDb) API. The app features responsive design, a user-friendly interface, and the ability to browse through various movie categories, such as popular, top-rated, and now playing movies.


### Screenshot

![](./screenshots/movie%20home.png)
![](./screenshots/movie%20page.png)
![](./screenshots/movie%20details.png)
![](./screenshots/people%20page.png)
![](./screenshots/people%20details.png)


## Features

- **Movie Listings**: Browse and view movies from different categories (Popular, Top Rated, Now Playing).
- **Search Functionality**: Search for specific movies by title.
- **Movie Details**: View detailed information about a movie, including description, release date, rating, and trailer.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **React**: Frontend JavaScript library to build the user interface.
- **TMDb API**: Used to fetch movie data.
- **Axios**: For making HTTP requests to the TMDb API.
- **React Router**: To handle page navigation without full-page reloads.
- **CSS / Sass**: For styling the application.
- **Tailwind CSS**: For utility-first CSS styling.
- **Framer Motion**: For smooth animations and transitions.
- **Vite**: The build tool used for faster development.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/movie-app.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd movie-app
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env` file and add your TMDb API key:**

   ```bash
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```

   You can get an API key from [TMDb's website](https://www.themoviedb.org/).

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   This will launch the app on `http://localhost:3000`.

## Usage

- Open the app in your browser at `http://localhost:3000`.
- Browse the movie categories or search for a specific movie.
- Click on a movie to view more details.

## Contributing

Feel free to open issues, suggest features, or contribute by creating pull requests.

## License

This project is licensed under the MIT License.

---

You can modify this template according to your app’s specific features or structure!