import { Usuario, UsuarioResponse } from "../models/Usuario";
import { LivroRepository } from "../repositories/LivroRepository";
import { UsuarioLivroRepository } from "../repositories/UsuarioLivroRepository";
import { UsuarioRepository } from "../repositories/UsuarioRepository"

export const UsuarioService : {
    
    addUserFavBook: (userId: number, bookId: number) => Promise<undefined | boolean>
    get: (userId: number) => Promise<UsuarioResponse | undefined>
    list: () => Promise<UsuarioResponse[]>

} = {
    
    addUserFavBook: async (userId, bookId) => {

        const userExists = await UsuarioRepository.userExists(userId);
        const bookExists = await LivroRepository.bookExists(bookId)

        console.log(userExists);
        console.log(bookExists);

        if (userExists && bookExists) {
            UsuarioLivroRepository.save(userId, bookId);

            return true
        }

        return undefined
    },

    get: async (userId) => {
        const user = await UsuarioRepository.get(userId);

        if(user == undefined) {
            return undefined
        }
        
        const books = await UsuarioLivroRepository.listByUserId(userId);
        const user_response: UsuarioResponse = {...user, livros_favoritos: books}

        return  user_response;
    },

    list: async () => {
        const users = await UsuarioRepository.list();
        const users_response : UsuarioResponse[] = [];

        for(let i = 0; i < users.length; i++) {
            const books = await UsuarioLivroRepository.listByUserId(users[i].uid);
            users_response.push({...users[i], livros_favoritos: books})
        }

        return users_response;
    }
}