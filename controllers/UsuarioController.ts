import { Router } from "express";
export const UsuarioController = Router();

UsuarioController.get("/usuario", async (req, res, next) => {
    console.log("Acessando UsuarioController...");

    res.send("Retornando usuários...")
})