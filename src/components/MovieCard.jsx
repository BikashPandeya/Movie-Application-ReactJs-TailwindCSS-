import React from "react";

const MovieCard = ({
  movie
}) => {
  //destructuring prop object as movie. then destructuring movie object into individual elements title, vote_average , poster_path , release_date , original_language to use them individually without movie. ahead
  return (
    <div className="movie-card">
      <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} alt={movie.title} srcset="" />

      <div className="mt-4">
        <h3>{movie.title}</h3>

        <div className="content">
            <div className="rating">
                <img src="star.svg" alt="Star Icon" srcset="" />
                <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
            </div>

            <span>•</span>

            <p className="lang">{movie.original_language}</p>
            <span>•</span>
            <p className="year">{movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
