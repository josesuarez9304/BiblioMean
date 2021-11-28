import express from "express";
import admin from "../controllers/admin.js";
//import auth  from "../middlewares/auth.js";
//import adminsecure  from "../middlewares/admin.js";
const router = express.Router();

//no se puede aut por q es libre cualqueir personaq  entre se registra 
router.post("/registerAdmin", admin.registerAdmin);
//debe loguearse no necesita  cuadoq quiera entra y listo
router.post("/login", admin.loginAdmin)
router.get("/listAdmins", admin.listAdmins);
router.get("/findAdmin/:_id", admin.findAdmin);
router.put("/updateAdmin", admin.updateAdmin);
router.delete("/deleteAdmin/:_id", admin.deleteAdmin);

export default router;