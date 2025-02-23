import { useEffect, useState } from "react";
import { Atom } from "react-loading-indicators";
// import ReactStars from "react-rating-stars-component";
import { Rating } from "@smastrom/react-rating";
import StarRating from "./StarRating";
function ListsContainer({ movies }) {
  const [selectedID, setSelectedID] = useState("");
  const [movieDetail, setMovieDetail] = useState({});
  const [isMDSeleted, setIsMDSeleted] = useState(false);

  function onViewDetail(index) {
    setSelectedID((prev) => index); // Directly set the object from movies array
  }

  return (
    <div className="flex justify-between rounded-lg mb-3">
      {/* Left Column with Scrolling */}
      <div className="w-[59%] overflow-y-auto max-h-screen bg-slate-900 rounded-2xl">
        <MovieComponent movies={movies} onViewDetail={onViewDetail} />
      </div>

      {/* Right Column */}
      <div className="w-[39%] bg-slate-900 rounded-2xl">
        <MovieDetail
          selectedID={selectedID}
          movieDetail={movieDetail}
          OnSetMovieDetail={setMovieDetail}
        />
      </div>
    </div>
  );
}

function MovieDetail({ selectedID, movieDetail, OnSetMovieDetail }) {
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("usePopCorn")
  const handleRatingChange = (newRating) => {
    console.log("Selected Rating:", newRating);
  };

  useEffect(
    function () {
        const controller = new AbortController();
      setIsLoading(true);
      async function fetchMovieDetail() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=cf9cd0e1&i=${selectedID}`, {signal: controller.signal }
        );
        const data = await res.json();
        if (data.Response === "True") {
          OnSetMovieDetail(data);
          console.log("TTTTT" +movieDetail.Title);
          setTitle(prev => `usePopCorn | ${movieDetail.Title}`)
          document.title = title
        }
        setIsLoading(false);
      }
      fetchMovieDetail();

      return function (){
        controller.abort();
      }
    },
    [selectedID]
  );

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-lg">
      {Object.keys(movieDetail).length === 0 ? (
        <p> No Movies Details </p>
      ) : !isLoading ? (
        <div className="flex flex-col">
          <div className="content flex gap-5">
            <img
              src={movieDetail.Poster}
              alt={movieDetail.Title}
              className="w-full h-auto sm:w-48 rounded-lg shadow-md object-cover"
            />
            <div className="mt-4 text-white flex flex-col gap-2">
              <h2 className="text-2xl font-bold">{movieDetail.Title}</h2>
              <p className="mt-2">
                <span className="font-bold"> Released : </span>
                {movieDetail.Released}
              </p>
              <p>
                <span className="font-bold"> Genre : </span> {movieDetail.Genre}
              </p>
              <p>
                <span className="font-bold"> Rated : </span> {movieDetail.Rated}
              </p>
              <p>
                <span className="font-bold"> Runtime : </span>
                {movieDetail.Runtime}
              </p>
              <p>
                <span className="font-bold"> Director : </span>
                <span className="text-blue-700"> {movieDetail.Director} </span>
              </p>
              <p>
                <span className="font-bold"> Actors : </span>
                <span className="text-blue-700"> {movieDetail.Actors} </span>
              </p>

              {/* You can add more movie details here */}
            </div>
          </div>
          <div className="rating flex flex-col items-center justify-center my-3">
            <div className="my-3 h-30 bg-gray-800 flex flex-col gap-5 items-center justify-center rounded-lg w-100">
              <StarRating maxRating={5} onRatingChange={handleRatingChange} />
              <button className="bg-cyan-800 py-3 px-4 rounded-lg text-sm font-semibold"> ADD TO WATCH LIST</button>
            </div>
          </div>
          <div className="plot pt-3">
            <h1 className="text-xl font-bold pb-2"> Story </h1>
            <p className="indent-8.5 text-slate-300">{movieDetail.Plot}</p>
          </div>
        </div>
      ) : (
        <div className="text-center pt-5">
          <Atom color="#078a9e" size="medium" text="Loading..." textColor="" />
        </div>
      )}
    </div>
  );
}

function MovieComponent({ movies, onViewDetail }) {
  if (movies) {
    return (
      <ul className="px-4 pt-3">
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            index={movie.imdbID}
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
