import { useState } from "react";


function NavBar({movies, query, onHandleQuery}) {
  return (
    <nav className="bg-blue-600 rounded-lg mb-3">
      <ul className="flex justify-between mx-10 h-15 items-center font-semibold">
        <Logo />
        <SearchBar query={query} onHandleQuery={onHandleQuery} />
        <FoundResult movies={movies} />
      </ul>
    </nav>
  );
}

function Logo() {
  return (
    <li className="text-xl font-extrabold">
      <span className="text-3xl">🍿</span> usePopCorn
    </li>
  );
}

function SearchBar({query, onHandleQuery}) {
    
    function handleSearchSubmit(e){
        e.preventDefault();
        // onHandleQuery(e.target.value);
        // console.log(e.target);
        onHandleQuery(searchInput);
        
    }
    return (
    <>
      <li>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => onHandleQuery(e.target.value)}
          className="w-90 py-1 indent-4 rounded-md text-base font-normal bg-blue-500 focus:outline-none"
        />
      </li>
    </>
  );
}

function FoundResult({movies}) {
    return (
    <li> Found {movies ? movies.length : 0} Result </li>
  )
}

export default NavBar;
