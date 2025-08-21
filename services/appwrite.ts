import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;
const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;

const client = new Client()
  .setEndpoint(endpoint!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const searchtermUpdate = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID!, COLLECTION_ID!, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID!,
        COLLECTION_ID!,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID!, COLLECTION_ID!, ID.unique(), {
        searchTerm: query,
        movie_id: movie.imdbID,
        count: 1,
        title: movie.Title,
        poster: movie.Poster,
      });
    }
  } catch (error) {
    throw error;
  }

  //   console.log(result);
};
