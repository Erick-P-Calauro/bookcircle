import { Usuario } from "./Usuario"

export type Grupo = {
    id: number,
    nome: string,
    criador: Usuario,
    integrantes: Usuario[]
}

// DTOs

export type GrupoCreate = {
    nome: string,
}

export type GrupoResponse = {
    id: number,
    nome: string,
    // criador: Usuario,
    // integrantes: Usuario[]
}