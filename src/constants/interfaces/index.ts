import { ReactElement } from "react";

interface RouteObject {
  name: string;
  path: string;
  element: ReactElement;
}

interface MovieData {
  original_title: string;
  release_date: string;
  poster_path: string;
  spoken_languages: string;
  vote_average: number;
  vote_count: number;
  genres: Array<any>;
  id: number;
  overview: string;
}

export type { RouteObject, MovieData };
