import { db } from "../configuration/DatabaseConfiguration"
import { Livro } from "../models/Livro"

export const UsuarioLivroRepository : {
    save: (userId: number, bookId: number) => void
    listByUserId: (userId: number) => Promise<Livro[]>

} = {
    save : async (userId, bookId) => {
        await db.query(`INSERT INTO usuario_livro(usuario, livro) VALUES(${userId}, ${bookId})`)
    },

    listByUserId : async (userId) => {
        const response : Livro[] = (await db.query(
            `SELECT livro.uid, titulo, autor FROM livro
            INNER JOIN usuario_livro ON usuario = ${userId}`)).rows
    
        return response;
    }
}