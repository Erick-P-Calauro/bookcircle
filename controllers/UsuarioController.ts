import { Router } from "express";
import { UsuarioCreate, UsuarioResponse } from "../models/Usuario";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
export const UsuarioController = Router();

UsuarioController.get("/usuario", async (req, res) => {
    const users : UsuarioResponse[] = await UsuarioRepository.list();
    res.status(200).json(users);
})

UsuarioController.get("/usuario/:id", async (req, res) => {
    const { id } = req.params;
    let response = await UsuarioRepository.get(id);
    
    if(response == undefined) {
        res.status(404).send("Usuário não encontrado.") // Usuario não encontrado.
    }

    res.status(200).json(response);
})

UsuarioController.post("/usuario/save", async (req, res) => {
    const { nome, email, senha } = req.body
    const newUser: UsuarioCreate = {
        nome, email, senha
    }

    if(nome == undefined || email == undefined || senha == undefined) {
        res.sendStatus(400);
    }

    try{
        UsuarioRepository.save(newUser);
    }catch(e: any) {
        
        if(e.code == '23505') {
            res.status(400).send("Já existe usuário com este nome/email");
        }

        res.sendStatus(400);
    }

    res.sendStatus(201);
})

UsuarioController.put("/usuario/edit/:id", async (req, res) => {
    const { id } = req.params;
    const newUser : UsuarioCreate = req.body;

    try{
        UsuarioRepository.edit(id, newUser);
    }catch(e: any) {

        if(e.code == '23505') {
            res.status(400).send("Já existe usuário com este nome/email");
        }

        res.sendStatus(400);
    }

    res.sendStatus(201);
})

UsuarioController.delete("/usuario/delete/:id", (req, res) => {
    const { id } = req.params;
    
    try {
        UsuarioRepository.delete(id);
    }catch(e: any) {
        res.sendStatus(400);
    }

    res.sendStatus(200);
})