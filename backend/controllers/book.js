//importa para mostrar de dodne viene
//// libros (name, author, yearPublication, registerDate, pages, gender, price) 
import book from "../models/book.js";
//llega de la vista request y el response es lo q sta fuyncion va a devolver
//el response dice q va devovler
const registerBook = async (req, res) => {
  //necesita saber si alguno es vacio o el nombre o la descrpcion como atributos vienene en el json
  if (!req.body.name || !req.body.author || !req.body.yearPublication || !req.body.gender ||!req.body.pages ||!req.body.price ) 
    //400 hay un error algo salio mal no llegaron alguno de los datos
    return res.status(400).send("Incomplete data");
  


//si vienen datos priemro validamos sino existe un rol
//va a busca por 1 solo campo q se llama nombre
//es como si estuviera en el compas o mongo llama metodos de alla 
//mongoose es mongo en backend
// el esta buscando en la tabla o coleccion rol en el atributo name el que le llego de la vista  
 //el wait ba dodne hcieamos algo de una respuestas que fuera hacer algo
//el sale de nuestra margen a buscar si mongo esta o no esta  y el espera
//hace una query  haber si esta 
const existingBook = await book.findOne({name: req.body.name});
//si ya existe manda el error
  if (existingBook) return res.status(400).send("The book already exist");
 
  //sino exite crea el esquema 
  const bookSchema = new book({
      name: req.body.name,
      author: req.body.author,
      yearPublication: req.body.yearPublication,
      gender: req.body.gender,
      pages: req.body.pages,
      price: req.body.price,
     
  })

  //y despuesva y lo va a guardar a otro lado 
  //coloco el await para que pueda hacerlo
//el commit tiene todo listo le confirmo con el push
  const result = await bookSchema.save();
  //si eso esta vacio osea con signod e admiracion 
   if(!result) return res.status(400).send("Failed to register BOOK");
   
   
   return res.status(200).send({result});

};

//CONSULTA API GET
//listar todos los roles
//funciones asincronas se pueden ejecutar multiples funciones en el tiempo
const listBook= async (req, res)=> {
  //solo a post put y delete se le envian datos  en get no es necesario
  //va a la colecciond e mongo  a hacer un .find() este trae todos, recuerde findOne busca la primera coincidencia de nombre
  const bookSchema = await book.find();
  //si eso esta null o vacio !rolesSchema
  //esto puede traer varios datos ya no sirve  solo  una cosa
  //recuerden que el arrays tiene posiciones desde 0 pero item son los q allan dentro objetos
  //con el punto length se mira si hay elmntos items dentro
  //el empty role tambien se puede llevar  como objeto
  if(!bookSchema || bookSchema.length == 0 ) return res.status(400).send("Empty book list");
  //sino devuelve el json por eso se  le colcoa llavesita se toma la variable por si guarda un dato !roleSchema o varios datos  en el arraya roleSchema.length ==0
  return res.status(200).send({bookSchema})
}


//update 
const updateBook = async(req,res)=>{
//valida q no este vacio
  if(!req.body.name || !req.body.author||
    !req.body.yearPublication || !req.body.gender ||
    !req.body.pages || !req.body.price)
    return res.status(400).send("Incomplete data");

    //valida  si es exactamente el mismo roll cumpliendoi en y que todos los atributos sean
    //exacatamente lo mismo ej usuario tiene nombre  juan y edad 17 deben estar  alguno diferente para qentre
    //esto se hace por que  si el usuario le da aceptar en la actualizacion siendo el mismo registro desgastaria el sistema guardando el mismo
    const existingBook = await book.findOne({name:req.body.name,author:req.body.author,yearPublication:req.body.yearPublication,gender:req.body.gender,pages:req.body.pages,price:req.body.price,pages:req.body.pages });
    if(existingBook) return res.status(400).send("The book already exist");

    //si paso es por q lo va  a actualizar 
    const bookUpdate = await book.findByIdAndUpdate(req.body._id,{name: req.body.name,author:req.body.author,yearPublication:req.body.yearPublication,
      gender:req.body.gender,price:req.body.price,pages:req.body.pages})

      //si esta vacio al editar manda error de edicion usuario que coloco todo en blanco de un registro q estaba
      return !bookUpdate
      ? res.status(400).send("Error editing book")
      : res.status(200).send({bookUpdate});

}

//ELIMINAR
//siempre lleva request y response
const deleteBook = async(req,res)=>{
  const bookDelete = await book.findByIdAndDelete({_id: req.params["_id"]})

  //si no elimino nada
  return !bookDelete 
  //angular le va a decir no muestro string a mi solo digame por json
  ? res.status(400).send("Book no found")
  : res.status(200).send("Book deleted")
}




//con este deja publico 
//no hay geter and setter 
//si es una funcion si lleva llaves
export default {registerBook,listBook,updateBook,deleteBook};

