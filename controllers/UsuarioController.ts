import { Router } from "express";
import { db } from "../configuration/DatabaseConfiguration";
import { Usuario } from "../models/Usuario";
export const UsuarioController = Router();

UsuarioController.get("/usuario", async (req, res) => {
    const users : Usuario[] = (await db.query("SELECT * FROM usuario")).rows;
    res.json(users);
})

UsuarioController.get("/usuario/:id", async (req, res) => {
    
    const { id } = req.params;

    let response = await db.query("SELECT * FROM usuario WHERE uid = "+id);
    
    if(response.rowCount == 0) {
        res.sendStatus(404) // Usuario não encontrado.
    }

    const user : Usuario = response.rows[0];
    res.json(user);
})

UsuarioController.post("/usuario/save", async (req, res) => {
    const { nome, email, senha } = req.body

    if(nome == undefined || email == undefined || senha == undefined) {
        res.sendStatus(400);
    }

    try{
        await db.query(`INSERT INTO usuario(nome, email, senha) VALUES('${nome}', '${email}', '${senha}')`);
    }catch(e: any) {
        
        if(e.code == '23505') {
            res.send("Já existe usuário com este nome/email");
        }

        res.sendStatus(400);
    }

    res.sendStatus(201);
})