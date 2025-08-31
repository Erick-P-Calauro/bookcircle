export type Livro = {
    id: number,
    titulo: string,
    autor: string,
}

// DTOs

export type LivroCreate = {
    titulo: string,
    autor: string, 
}

export type LivroResponse = {
    id: number,
    titulo: string,
    autor: string,
}