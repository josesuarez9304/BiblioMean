//importa express
import express from "express";
import vendors from "../controllers/vendors.js";
const router =express.Router()

//http://localhost:3001/api/book/registerBook
router.post("/registerVendors",vendors.registerVendors);
router.get("/listVendors",vendors.listVendors);


//actualizar role
router.put("/updateVendors",vendors.updateVendors);

//eliminar role
//esta por debaj la papelera y lo elimina
router.delete("/deleteVendors/:_id",vendors.deleteVendors);


// no lleva llaves por q no es funcion
export default  router