import { Usuario } from "./Usuario"

export type Grupo = {
    id: number,
    nome: string,
    criador: Usuario,
    integrantes: Usuario[]
}