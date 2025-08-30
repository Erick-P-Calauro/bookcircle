import { Livro } from "./Livro"

export type Usuario = {
    id: number,
    nome: string,
    email: string,
    senha : string,
    livros_favoritos : Livro[]
}