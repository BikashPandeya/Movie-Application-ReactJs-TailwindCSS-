import React from "react";
import { useEffect, useState } from "react";
import Search from "./components/search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { updateSearchCount } from "./appwrite";
import { getTrendingMovies } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setsearchTerm] = useState(""); // Stores user input

  const [errormessage, seterrormessage] = useState("");

  const [movielist, setmovielist] = useState([]);
  const [isloading, setisloading] = useState(false);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Stores debounced value

  const [TrendingMovies, setTrendingMovies] = useState([])

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm); // Update debounced state
    },
    500, // Debounce delay (500ms) . I means waits for user typing for 500ms before rendring it
    [searchTerm] // Runs when searchTerm changes
  );

  const fetchMovies = async (query = "") => {
    const loadTrendingMovies = async () => {
        try {
          const movies = await getTrendingMovies()
        } catch (error) {
          console.error(`Error fetching trending movies : ${error}`)
        }
      }


    setisloading(true);
    seterrormessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      if (data.response == false) {
        seterrormessage(data.error || "Failed to fetch movies");
        setmovielist([]);
        return;
      }

      setmovielist(data.results || []);

      if(query && data.results.length > 0){
        await updateSearchCount(query , data.results[0])
      }
    } catch (error) {
      console.error(`Error fetching movies : ${error}`);
      seterrormessage("Error fetching Movies. Please try again later");
    } finally {
      setisloading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main className="relative w-screen h-screen bg-cover bg-center bg-no-repeat bg-[url('/BG.png')]">
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className="mt-20">All Movies</h2>
          {isloading ? (
            <Spinner />
          ) : errormessage ? (
            <p className="text-red-500">{errormessage}</p>
          ) : (
            <ul>
              {movielist.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
