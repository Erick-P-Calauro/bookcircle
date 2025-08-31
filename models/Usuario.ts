import { Livro } from "./Livro"

export type Usuario = {
    id: number,
    nome: string,
    email: string,
    senha : string,
    livros_favoritos : Livro[]
}

// DTOs

export type UsuarioCreate = {
    nome: string,
    email: string,
    senha: string
}

export type UsuarioResponse = {
    id: number,
    nome: string,
    email: string,
    senha : string,
}