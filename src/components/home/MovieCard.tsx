import { MovieData } from "src/constants/interfaces";

interface MovieCardProps {
  movieData: MovieData;
  setShowMovieModal: any;
}

const MovieCard = ({ movieData, setShowMovieModal }: MovieCardProps) => {
  const { original_title, release_date, poster_path, id } = movieData;
  const year = new Date(release_date).getFullYear();
  return (
    <div
      className="card-container"
      onClick={() => setShowMovieModal({ showModal: true, id })}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
        alt="movie-poster"
        width={250}
      />
      <div>
        <h3>{original_title}</h3>
        <p>{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
