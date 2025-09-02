import { Router } from "express";
import { LivroRepository } from "../repositories/LivroRepository";
import { LivroCreate, LivroResponse } from "../models/Livro";

export const LivroController = Router();

LivroController.get("/livro", async (req, res) => {
    const response : LivroResponse[] = await LivroRepository.list();

    return res.status(200).json(response);
})

LivroController.get("/livro/:id", async (req, res) => {
    const { id } = req.params;
    const response : LivroResponse | undefined = await LivroRepository.get(id);

    if(response == undefined) {
        res.status(404).send("Livro não encontrado.");
    }

    return res.status(200).json(response);
})

LivroController.post("/livro/save", async (req, res) => {
    const { titulo, autor } = req.body;
    const newLivro : LivroCreate = {
        titulo, autor
    }

    if(titulo == undefined || autor == undefined) {
        res.sendStatus(400);
    }

    try {
        LivroRepository.save(newLivro);
    }catch(e: any) {
        
        if(e.code == '23505') {
            res.status(400).send("Já existe livro com este título.");
        }

        res.sendStatus(400);
    }

    res.sendStatus(201);
})

LivroController.put("/livro/edit/:id", async (req, res) => {
    const { id } = req.params;
    const newLivro : LivroCreate = req.body;

    try {
        LivroRepository.edit(id, newLivro);
    }catch(e: any) {
        
        if(e.code == '23505') {
            res.status(400).send("Já existe livro com este título.");
        }

        res.sendStatus(400);
    }

    res.sendStatus(201);
})

LivroController.delete("/livro/delete/:id", async(req, res) => {
    const { id } = req.params;

    try {
        LivroRepository.delete(id);
    }catch(e: any) {
        res.sendStatus(400);
    }

    res.sendStatus(200);
})