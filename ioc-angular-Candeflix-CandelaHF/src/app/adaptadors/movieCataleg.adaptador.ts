import { MovieResponse } from "../models/movieAPIResponse.model";
import { MovieCataleg } from "../models/movieCataleg.model";

export function adaptarMovieApi(apiMovie: MovieResponse): MovieCataleg {
    return {
        id: apiMovie.id.toString(),
        titol: apiMovie.nom,
        descripcio: apiMovie?.descripcio,
        categoria: apiMovie.categoria,
        preu: apiMovie.preu,
        imatgeUrl: `https://image.tmdb.org/t/p/w500${apiMovie.poster_path}`,
        esPopular: apiMovie.popular,
        unitats: apiMovie.stock,
        puntuacio: apiMovie.vote_average,
        vots: apiMovie.vote_count,
        data: apiMovie.release_date
    } as MovieCataleg;
}

export function adaptarMoviesApi(apiMovies: MovieResponse[]): MovieCataleg[] {
    return apiMovies.map(adaptarMovieApi);
}