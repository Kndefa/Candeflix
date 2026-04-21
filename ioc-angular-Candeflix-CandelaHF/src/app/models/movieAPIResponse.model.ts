export type MovieAPIResponse = MovieResponse[];
    
export interface MovieResponse {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  categoria: string;
  id: number;
  original_language: string;
  original_title: string;
  descripcio?: string;
  popular: boolean;
  poster_path: string | null;
  release_date: string;
  nom: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  stock: number;
  preu: number;
}