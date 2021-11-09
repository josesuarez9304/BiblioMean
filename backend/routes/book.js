//importa express
import express from "express";
import book from "../controllers/book.js";
const router =express.Router()

//http://localhost:3001/api/book/registerBook
router.post("/registerBook",book.registerBook);
router.get("/listBook",book.listBook);

//actualizar  libro
router.put("/updateBook",book.updateBook);
//eliminar libro
router.delete("/deleteBook/:_id",book.deleteBook);




// no lleva llaves por q no es funcion
export default  router