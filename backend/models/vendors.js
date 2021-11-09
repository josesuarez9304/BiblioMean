//5 - Crear el proceso para registrar proveedores (name, address, registerDate.)
// libros (name, author, yearPublication, registerDate, pages, gender, price) 
import mongoose from "mongoose";

const vendorsSchema = new mongoose.Schema(


 {
     name:String,
     address:String,
     registerDate:{type: Date,default:Date.now},
     
 }

);
const  vendors = mongoose.model("vendors",vendorsSchema);

export default vendors