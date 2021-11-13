//importa express
import express from "express";
import client from "../controllers/client.js";
const router =express.Router()

//http://localhost:3001/api/book/registerBook
router.post("/registerClient",client.registerClient);
//el login se usa en post por q entra y se genera el jwt con la info de el sin el email o el correo , lso datos es para que los use el front
router.post("/login",client.login);
router.get("/listClient",client.listClient);





//actualizar role
router.put("/updateClient",client.updateClient);

//eliminar role
//esta por debaj la papelera y lo elimina
router.delete("/deleteClient/:_id",client.deleteClient);



// no lleva llaves por q no es funcion
export default  router