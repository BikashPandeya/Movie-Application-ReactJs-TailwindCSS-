import React from "react";

// const Search = (props) => {
const Search = ({ searchTerm, setsearchTerm }) => {
  //Destructuring props object

  return (
    <div className="search">

      <div>
        <img src="/Vector.svg" alt="search" />
        <input 
        type="text"
        placeholder="Search through thousand of movies"
        value = {searchTerm}
        onChange={(event) => setsearchTerm(event.target.value)} 
        />
      </div>
    </div>
  );
};

export default Search;
