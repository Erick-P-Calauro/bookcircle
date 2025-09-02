import { db } from "../configuration/DatabaseConfiguration"
import { Usuario, UsuarioCreate } from "../models/Usuario"

export const UsuarioRepository : {

    list: () => Promise<Usuario[]>,
    get: (id: number) => Promise<Usuario | undefined>,
    save: (usuario : UsuarioCreate) => void
    edit: (id: number, usuario: UsuarioCreate) => void,
    delete: (id: number) => void
    userExists: (userId: number) => Promise<boolean>

} = {

    list: async () => {
        const response = await db.query("SELECT * FROM usuario");
        const users : Usuario[] = response.rows;

        return users; 
    },

    get: async (id: number) : Promise<Usuario | undefined> => {
        const response  = await db.query(`SELECT * FROM usuario WHERE uid = ${id}`);

        if(response.rowCount == 0) {
            return undefined;
        }

        return response.rows[0];
    },

    save: async(usuario : UsuarioCreate) => {
        await db.query(`INSERT INTO usuario(nome, email, senha) VALUES('${usuario.nome}', '${usuario.email}', '${usuario.senha}')`);
    },  

    edit: async(id: number, usuario: UsuarioCreate) => {
        await db.query(`UPDATE usuario SET nome = '${usuario.nome}', email = '${usuario.email}', senha = '${usuario.senha}' WHERE uid = ${id}`);
    },

    delete: async (id: number) => {
        await db.query(`DELETE FROM usuario WHERE uid = ${id}`)
    },

    userExists: async (id: number) => {
        const response = await db.query(`SELECT * FROM usuario WHERE uid = ${id}`)

        if(response.rowCount == 0) {
            return false;
        }

        return true;
    },

}