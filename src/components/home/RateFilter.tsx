interface RateFilterProps {
  rate: number;
  setMovieSearch: any;
}

const RateFilter = ({ rate, setMovieSearch }: RateFilterProps) => {
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            className="star-container"
            key={index}
            onClick={() =>
              setMovieSearch((prevState: any) => ({
                ...prevState,
                rate: prevState.rate == index ? 0 : index,
              }))
            }
          >
            <span className={index <= rate ? "star star-filled" : "star"}>
              &#9733;
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default RateFilter;
