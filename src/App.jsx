import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import ListsContainer from "./Components/ListsContainer";
const KEY = "cf9cd0e1";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("top movies");

  useEffect(
    function () {
      async function fetchMovies() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        const data = await res.json();
        setMovies(data.Search);
      }
      fetchMovies();
    },
    [query]
  );

  return (
    <div className="pt-3 px-4">
      <NavBar movies={movies} onHandleQuery={setQuery} />

      <ListsContainer movies={movies} />
    </div>
  );
}


export default App;
