import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MovieCard, MovieModal, RateFilter } from "src/components";
import debounce from "lodash.debounce";
import { getMoviesData } from "./helper";
import { MovieData } from "src/constants/interfaces";

const Home = () => {
  const [movieSearch, setMovieSearch] = useState({
    movieList: [],
    query: "",
    page: 1,
    rate: 0,
  });
  const [showMovieModal, setShowMovieModal] = useState({
    showModal: false,
    id: "",
  });

  const { movieList, query, page, rate } = movieSearch;

  useEffect(() => {
    if (movieList.length === 0 || page >= 1 || query.length === 0) {
      getMoviesData(query, setMovieSearch, page);
    }

    return debounceResults.cancel();
  }, [page, query]);

  const renderBody = () => {
    if (movieList.length === 0 && query.length > 0) {
      return <h5>No results</h5>;
    } else {
      const filteredList = movieList.filter(
        (movieData: MovieData) => movieData.vote_average / 2 >= rate
      );

      return filteredList.map((movieData: MovieData, index) => (
        <MovieCard
          movieData={movieData}
          setShowMovieModal={setShowMovieModal}
          key={`card-${index}`}
        />
      ));
    }
  };

  const handlePagination = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLInputElement;
    if (eventTarget.value === "next") {
      setMovieSearch((prevState) => ({
        ...prevState,
        page: (prevState.page += 1),
      }));
    } else {
      setMovieSearch((prevState) => ({
        ...prevState,
        page: (prevState.page -= 1),
      }));
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMovieSearch((prevState) => ({
      ...prevState,
      query: e.target.value,
    }));
    getMoviesData(e.target.value, setMovieSearch, page);
  };

  const debounceResults = useMemo(() => debounce(handleInput, 500), []);

  return (
    <main className={"home-container"}>
      <section className="bar-section">
        <h2>
          Search Movies <BsSearch className="icon" />
        </h2>

        <input
          placeholder="Search..."
          className="search-bar"
          onChange={debounceResults}
        />
        <div>
          <h4>Filter by rating:</h4>
          <RateFilter rate={rate} setMovieSearch={setMovieSearch} />
        </div>
      </section>

      <section
        className={
          showMovieModal.showModal
            ? "display-section modal-open"
            : "display-section"
        }
      >
        {renderBody()}
      </section>

      {showMovieModal.showModal && (
        <MovieModal
          movieId={showMovieModal.id}
          setShowMovieModal={setShowMovieModal}
        />
      )}

      <section className="buttons-container">
        <button
          disabled={page === 1}
          value={"previous"}
          onClick={handlePagination}
        >
          Previous Page
        </button>
        <button value={"next"} onClick={handlePagination}>
          Next Page
        </button>
      </section>
    </main>
  );
};

export default Home;
