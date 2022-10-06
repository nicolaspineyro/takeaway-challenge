const key = process.env.REACT_APP_KEY;

export const getMoviesData = async (
  query: String,
  setMovieSearch: any,
  page: number
) => {
  let url;
  if (query.length) {
    url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}&language=en-US&page=${page}`;
  } else {
    url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${page}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    setMovieSearch((prevState: any) => ({
      ...prevState,
      movieList: data.results,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const getMovieData = async (id: any, setData: any) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
