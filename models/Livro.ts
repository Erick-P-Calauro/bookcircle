export type Livro = {
    uid: number,
    titulo: string,
    autor: string,
}

// DTOs

export type LivroCreate = {
    titulo: string,
    autor: string, 
}

export type LivroResponse = {
    uid: number,
    titulo: string,
    autor: string,
}