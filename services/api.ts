export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string; // "True" or "False"
  Error?: string; // Present if Response is "False"
}

const OMDB_API_KEY = "127801a8";

export const fetchMovieData = async (title: string): Promise<Movie[]> => {
  if (!OMDB_API_KEY) {
    console.error("OMDb API key is required.");
    return [];
  }

  const endpoint = title
    ? `http://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}&page=1`
    : `http://www.omdbapi.com/?s=avengers&apikey=${OMDB_API_KEY}`;
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return [];
    }

    const data: { Search?: Movie[]; Response: string; Error?: string } =
      await response.json();

    if (data.Response === "True" && data.Search) {
      return data.Search;
    } else {
      console.warn(`OMDb API Error: ${data.Error || "Movie not found."}`);
      return [];
    }
  } catch (err) {
    console.error("Error fetching movie data:", err);
    return [];
  }
};
