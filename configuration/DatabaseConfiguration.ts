import { Pool } from "pg"
import { config } from "dotenv"
config()

export const db = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DATABASE,
})

export const initDb = async () => {
    
    await db.query("CREATE TABLE IF NOT EXISTS livro(uid serial PRIMARY KEY NOT NULL, titulo varchar(255) NOT NULL UNIQUE, autor varchar(255) NOT NULL);");
    await db.query("CREATE TABLE IF NOT EXISTS usuario(uid serial PRIMARY KEY NOT NULL, nome varchar(255) NOT NULL UNIQUE, email varchar(255) NOT NULL UNIQUE, senha varchar(255) NOT NULL);");
    await db.query("CREATE TABLE IF NOT EXISTS livro_usuario(uid serial PRIMARY KEY NOT NULL, usuario integer NOT NULL REFERENCES usuario(uid), livro integer NOT NULL REFERENCES livro(uid));")
    await db.query("CREATE TABLE IF NOT EXISTS grupo(uid serial PRIMARY KEY NOT NULL, nome varchar(255) NOT NULL, criador integer REFERENCES usuario(uid));")
    await db.query("CREATE TABLE IF NOT EXISTS grupo_usuario(uid serial PRIMARY KEY NOT NULL, usuario integer REFERENCES usuario(uid), grupo integer REFERENCES grupo(uid));");

}