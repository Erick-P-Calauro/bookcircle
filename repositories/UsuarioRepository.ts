import { db } from "../configuration/DatabaseConfiguration"
import { UsuarioCreate, UsuarioResponse } from "../models/Usuario"

export const UsuarioRepository : {

    list: () => Promise<UsuarioResponse[]>,
    get: (id: number) => Promise<UsuarioResponse | undefined>,
    save: (usuario : UsuarioCreate) => void
    edit: (id: number, usuario: UsuarioCreate) => void,
    delete : (id: number) => void

} = {

    list: async () => {
        const response = await db.query("SELECT * FROM usuario");
        const users : UsuarioResponse[] = response.rows;

        return users; 
    },

    get: async (id: number) => {
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
    }

}