export interface MovieCataleg {
    id: string;
    titol: string;
    descripcio?: string;
    categoria?: string;
    imatgeUrl: string;
    puntuacio: number;
    esPopular: boolean;
    preu: number;
    unitats: number;
    vots: number;
    data: string;
}