import { Router } from "express";

export const LivroController = Router();

LivroController.get("/livro", async (req, res) => {
    res.send("Enviando livros...")
})