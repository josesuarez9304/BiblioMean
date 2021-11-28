import  admin from "../models/admin.js";

const adminTrue = async (req, res,next)=>{
    //como ya hay un usuario admin logueado debe existir por parametro el id
    //antes d ellegar aca ya paso por el auth 
    //aca el va a bucar en la bae de datos el id del usurio q esta loguedo  en la colecciond e admin y lo guarda aca
    const adminUser = await admin.findById(req.admin._id);
    if (!adminUser) return res.status(400).send({ message: "Admin no found" });

//  return adminUser ===  "NO SE COMO VALIDAR QUE EL OBJETO QUE SACO DEL REQ Q TIENE EN EL LOGIN LO COMPARE CON LA BASE ME PERDI AHI =("
//si no le creo por defecto a todos los registros del amidn que gaurden un campo tipo que se a igual a admin y se la hace la operacion igual q el rol si el esatus no sirve
console.log(Object.values(adminUser));
return adminUser.dbStatus === true  
? next()
: res.status(400).send({ menssage: "Unauthorized user" });
};

export default  adminTrue;