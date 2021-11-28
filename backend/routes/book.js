//importa express
import express from "express";
import book from "../controllers/book.js";
const router = express.Router();
//para que el permiso solo lo pueda hacer un usuario un administrador
import auth from "../middlewares/authAdmin.js";
//para verificar que sea admin el q esta registardo en la base de datos
import admin from "../middlewares/admin.js";

//http://localhost:3001/api/book/registerBook
router.post("/registerBook", auth, admin, book.registerBook);
router.get("/listBook", auth, admin, book.listBook);
router.get("/findBook/:_id", auth, admin, book.findBook);

//actualizar  libro
router.put("/updateBook", auth, admin, book.updateBook);
//eliminar libro
router.delete("/deleteBook/:_id", auth, admin, book.deleteBook);

// no lleva llaves por q no es funcion
export default router;
