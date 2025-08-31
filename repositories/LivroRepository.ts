import { db } from "../configuration/DatabaseConfiguration";
import { LivroCreate, LivroResponse } from "../models/Livro"

export const LivroRepository : {

    list: () => Promise<LivroResponse[]>,
    get: (id: number) => Promise<LivroResponse | undefined>,
    save: (livro: LivroCreate) => void,
    edit: (id: number, livro: LivroCreate) => void,
    delete: (id: number) => void

} = {

    list: async () => {
        const response: LivroResponse[] = (await db.query(`SELECT * FROM livro`)).rows;

        return response;
    },

    get: async(id: number) => {
        const response = (await db.query(`SELECT * FROM livro WHERE uid = ${id}`));

        if(response.rowCount == 0) {
            return undefined;
        }

        return response.rows[0];
    },

    save: async(livro: LivroCreate) => {
        await db.query(`INSERT INTO livro(titulo, autor) VALUES('${livro.titulo}', '${livro.autor}')`)
    },

    edit: async(id:number, livro: LivroCreate) => {
        await db.query(`UPDATE livro SET titulo = '${livro.titulo}', autor = '${livro.autor}' WHERE uid = ${id}`)
    },

    delete: async(id: number) => {
        await db.query(`DELETE FROM livro WHERE uid = ${id}`)
    }

}