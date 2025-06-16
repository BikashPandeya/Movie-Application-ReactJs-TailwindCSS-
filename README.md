# MoviePedia

MoviePedia is a modern movie search application built with React, Vite, TailwindCSS, and Appwrite. It allows users to search for movies, view details, and discover what other users are searching for most frequently on the platform.

## Features

- **Movie Search:** Instantly search through thousands of movies using the TMDB API.
- **Trending Movies (Platform-Based):** See which movies are trending based on what users of MoviePedia are searching for the most, not based on global or industry trends.
- **Responsive UI:** Clean, responsive design using TailwindCSS.
- **Debounced Search:** Reduces unnecessary API calls for a smoother experience.
- **Loading Indicators:** User-friendly spinner while fetching data.

## How the Trending Feature Works

Unlike typical "trending" sections that show what's popular worldwide or in the movie industry, MoviePedia's **Trending Movies** feature is unique to this platform:

- **User-Driven Trends:** The trending list is generated from the most frequent search terms entered by users of MoviePedia.
- **Platform-Specific:** It reflects the interests and searches of MoviePedia users only, not what's trending globally.
- **How It Works:** Each time a user searches for a movie, the search term and the movie are recorded in the backend (using Appwrite). The trending section then displays the movies that have been searched for the most on MoviePedia.

> **Note:** This means the trending list is dynamic and unique to the MoviePedia community, and may differ from global movie trends.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.local` and fill in your TMDB and Appwrite credentials.

3. **Run the development server:**
   ```sh
   npm run dev
   ```

4. **Build for production:**
   ```sh
   npm run build
   ```

## Project Structure

- `src/` - Main source code
  - `components/` - React components (MovieCard, Search, Spinner)
  - `appwrite.js` - Appwrite integration for trending feature
  - `App.jsx` - Main application logic
- `public/` - Static assets

## Credits

- [TMDB API](https://www.themoviedb.org/documentation/api)
- [Appwrite](https://appwrite.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [React](https://react.dev/)

---

Enjoy discovering movies