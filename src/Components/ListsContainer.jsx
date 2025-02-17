import {useState} from 'react'

function ListsContainer({ movies }) {
  const [movieDetail, setMovieDetail] = useState({});
  function onViewDetail(index) {
    setMovieDetail(movies[index]); // Directly set the object from movies array
  }

  return (
    <div className="flex justify-between rounded-lg mb-3">
      {/* Left Column */}
      <div className="w-[74%] bg-slate-900 rounded-2xl">
        <MovieComponent movies={movies} onViewDetail={onViewDetail} />
      </div>
      {/* Right Column */}
      <div className="w-[24%] bg-slate-900 rounded-2xl">
        {movieDetail ? (
          <MovieDetail movieDetail={movieDetail} />
        ) : (
          <div className="p-4 bg-slate-800 rounded-lg shadow-lg">
            <p className="text-white">No movie selected.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MovieDetail({ movieDetail }) {
  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <img
          src={movieDetail.Poster}
          alt={movieDetail.Title}
          className="w-full h-auto sm:w-48 rounded-lg shadow-md object-cover"
        />
        <div className="mt-4 text-white text-center">
          <h2 className="text-2xl font-bold">{movieDetail.Title}</h2>
          <p className="mt-2 text-gray-300">
            <span className="font-medium">Release Year:</span> {movieDetail.Year}
          </p>
          {/* You can add more movie details here */}
        </div>
      </div>
    </div>
  );
}


function MovieComponent({ movies, onViewDetail }) {
  if (movies) {
    return (
      <ul className="px-4 pt-3">
        {movies?.map((movie, index) => (
          <Movie
            movie={movie}
            key={index}
            index={index}
            onViewDetail={onViewDetail}
          />
        ))}
      </ul>
    );
  } else {
    return (
      <h1 className="text-center text-xl h-screen pt-5 text-red-600 font-bold">
        !! NO RESULT FOUND !!
      </h1>
    );
  }
}

function Movie({ movie, index, onViewDetail }) {
  return (
    <li
      key={index}
      className="cursor-pointer"
      onClick={() => onViewDetail(index)}
    >
      <div className="content rounded-md p-2 py-4 flex" key={index}>
        <img src={movie.Poster} alt={movie.Title} className="w-13" />
        <div className="description ps-5 flex flex-col gap-4">
          <h3 className="text-lg font-semibold">{movie.Title}</h3>
          <p> 🗓️ {movie.Year}</p>
        </div>
      </div>
      <hr className="text-slate-600" />
    </li>
  );
}

export default ListsContainer;
