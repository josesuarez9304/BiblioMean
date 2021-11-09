//4 - Crear el proceso para registrar clientes (name, email, password, registerDate, dbStatus)
//5 - Crear el proceso para registrar proveedores (name, address, registerDate.)
// libros (name, author, yearPublication, registerDate, pages, gender, price) 
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(


 {
     name:String,
     email:String,
     password: String,
     registerDate:{type: Date,default:Date.now},
     dbStatus: Boolean,
 }

);
const  client = mongoose.model("client",clientSchema);

export default client
