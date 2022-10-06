import { useEffect, useState } from "react";
import { getMovieData } from "src/pages/home/helper";

const MovieModal = ({ movieId, setShowMovieModal }: any) => {
  const [data, setData] = useState<any>();
  useEffect(() => {
    getMovieData(movieId, setData);
  }, [movieId]);

  if (!data) {
    return <div>Loading..</div>;
  }

  const {
    original_title,
    spoken_languages,
    vote_average,
    vote_count,
    genres,
    overview,
    release_date,
    poster_path,
  } = data;

  return (
    <div className="modal-container">
      <button
        className="close-button"
        onClick={() =>
          setShowMovieModal((prevState: any, initialState: any) => ({
            ...initialState,
          }))
        }
      >
        X
      </button>

      <div className="movie-data">
        <h2 className="movie-title">{original_title}</h2>
        <div className="movie-info">
          <img
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            alt="movie-poster"
            width={400}
          />

          <div className="movie-text">
            <p>Original title: {original_title}</p>
            <p>
              Languages:
              {spoken_languages?.map((language: any) => (
                <span key={`language-${language.name}`}> {language?.name}</span>
              ))}
            </p>
            <p>Released: {release_date}</p>
            <p>Rating: {vote_average}</p>
            <p>Votes: {vote_count}</p>
            <p>
              Genres:
              {genres?.map((genre: any) => (
                <span key={`language-${genre?.name}`}> {genre?.name}</span>
              ))}
            </p>
          </div>
        </div>

        <p>Overview: {overview}</p>
      </div>
    </div>
  );
};

export default MovieModal;
