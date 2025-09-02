import { Livro, LivroResponse } from "./Livro"

export type Usuario = {
    uid: number,
    nome: string,
    email: string,
    senha : string,
}

export type UsuarioCreate = {
    nome: string,
    email: string,
    senha: string
}

export type UsuarioResponse = {
    uid: number,
    nome: string,
    email: string,
    senha : string,
    livros_favoritos: LivroResponse[]
}