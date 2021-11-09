//importa express
import express from "express";
import client from "../controllers/client.js";
const router =express.Router()

//http://localhost:3001/api/book/registerBook
router.post("/registerClient",client.registerClient);
router.get("/listClient",client.listClient);




//actualizar role
router.put("/updateClient",client.updateClient);

//eliminar role
//esta por debaj la papelera y lo elimina
router.delete("/deleteClient/:_id",client.deleteClient);



// no lleva llaves por q no es funcion
export default  router