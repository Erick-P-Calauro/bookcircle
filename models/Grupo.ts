import { Usuario } from "./Usuario"

export type Grupo = {
    id: number,
    nome: string,
    integrantes: Usuario[]
}