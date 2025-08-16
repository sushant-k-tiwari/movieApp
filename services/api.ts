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
  imdbRating: number;
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

// Interface for search results
export interface SearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const OMDB_API_KEY = "127801a8";

// Simple in-memory cache
const cache = new Map<string, { data: Movie[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fetchMovieData = async (title: string): Promise<Movie[]> => {
  if (!OMDB_API_KEY) {
    console.error("OMDb API key is required.");
    return [];
  }

  // Check cache first
  const cacheKey = title || "default";
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    // First, search for movies
    const searchEndpoint = title
      ? `http://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}&page=1`
      : `http://www.omdbapi.com/?s=avengers&apikey=${OMDB_API_KEY}`;

    const searchResponse = await fetch(searchEndpoint);
    if (!searchResponse.ok) {
      console.error(`HTTP error! status: ${searchResponse.status}`);
      return [];
    }

    const searchData: {
      Search?: SearchResult[];
      Response: string;
      Error?: string;
    } = await searchResponse.json();

    if (searchData.Response !== "True" || !searchData.Search) {
      console.warn(`OMDb API Error: ${searchData.Error || "Movie not found."}`);
      return [];
    }

    // Then, fetch detailed information for each movie in parallel
    const searchResults = searchData.Search.slice(0, 9);
    const detailPromises = searchResults.map(async (searchResult) => {
      try {
        const detailEndpoint = `http://www.omdbapi.com/?i=${searchResult.imdbID}&apikey=${OMDB_API_KEY}`;
        const detailResponse = await fetch(detailEndpoint);

        if (detailResponse.ok) {
          const movieDetail: Movie = await detailResponse.json();
          if (movieDetail.Response === "True") {
            return movieDetail;
          }
        }
      } catch (err) {
        console.warn(`Error fetching details for ${searchResult.Title}:`, err);
      }

      // Return basic info if detailed fetch fails
      return {
        ...searchResult,
        Rated: "",
        Released: "",
        Runtime: "",
        Genre: "",
        Director: "",
        Writer: "",
        Actors: "",
        Plot: "",
        Language: "",
        Country: "",
        Awards: "",
        Metascore: "",
        imdbRating: 0,
        imdbVotes: "",
        DVD: "",
        BoxOffice: "",
        Production: "",
        Website: "",
        Response: "True",
      } as Movie;
    });

    // Wait for all detail requests to complete
    const detailedMovies = await Promise.all(detailPromises);

    // Cache the result
    cache.set(cacheKey, { data: detailedMovies, timestamp: Date.now() });


    return detailedMovies;
  } catch (err) {
    console.error("Error fetching movie data:", err);
    return [];
  }
};

// Function to clear cache if needed
export const clearCache = () => {
  cache.clear();
};
