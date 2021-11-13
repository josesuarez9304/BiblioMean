import client from "../models/client.js";
//importa bcryp para encritar el pasword
import bcrypt from "bcrypt";
//importa jsonwebtoken para dejar todos los datos del usario encriptados en el front
import jwt from "jsonwebtoken";
//moment sirve para encriptar las fechas que se crean  al momento de crear el jwt
import moment from "moment";

//llega de la vista request y el response es lo q sta fuyncion va a devolver
//el response dice q va devovler
const registerClient = async (req, res) => {
  //necesita saber si alguno es vacio o el nombre o la descrpcion como atributos vienene en el json name, email, password
  if (!req.body.name || !req.body.email || !req.body.password)
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
  //const existingClient = await client.findOne({name: req.body.name});
  //ahoa se busca por el email para ir a la fija
  const existingClient = await client.findOne({ email: req.body.email });
  //si ya existe manda el error
  if (existingClient)
   return res.status(400).send("The client already exist");

   //uso el hash  para moler 
   const hash = await bcrypt.hash(req.body.password,10);


  //sino exite crea el esquema
  const clientSchema = new client({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    dbStatus: true,
  });

  //y despuesva y lo va a guardar a otro lado
  //coloco el await para que pueda hacerlo
  //el commit tiene todo listo le confirmo con el push
  const result = await clientSchema.save();
  //si eso esta vacio osea con signod e admiracion
  if (!result) return res.status(400).send("Failed to register Client");

  return res.status(200).send({ message:"Client register" });
};

//CONSULTA API GET
//listar todos los roles
//funciones asincronas se pueden ejecutar multiples funciones en el tiempo
const listClient = async (req, res) => {
  //solo a post put y delete se le envian datos  en get no es necesario
  //va a la colecciond e mongo  a hacer un .find() este trae todos, recuerde findOne busca la primera coincidencia de nombre
  const clientSchema = await client.find();
  //si eso esta null o vacio !rolesSchema
  //esto puede traer varios datos ya no sirve  solo  una cosa
  //recuerden que el arrays tiene posiciones desde 0 pero item son los q allan dentro objetos
  //con el punto length se mira si hay elmntos items dentro
  //el empty role tambien se puede llevar  como objeto
  if (!clientSchema || clientSchema.length == 0)
    return res.status(400).send("Empty client list");
  //sino devuelve el json por eso se  le colcoa llavesita se toma la variable por si guarda un dato !roleSchema o varios datos  en el arraya roleSchema.length ==0
  return res.status(200).send({ clientSchema });
};

const updateClient = async (req, res) => {
  //no  deja estar vacios
  if (!req.body.name || !req.body.email || !req.body.password)
    //400 hay un error algo salio mal no llegaron alguno de los datos
    return res.status(400).send("Incomplete data");

  //comete el error de reemplaza lo q esta por lo mismo no lo deja  con esto evita que haga todo el proceso de sobreescritura del mismo dato no se de si es el mismo usuario
  const existingClient = await client.findOne({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  if (existingClient) return res.status(400).send("The client already exist");

  //busca por el id y apenas lo encuentre actualiza
  //por q carajos uso body por q esta usando el json del listado que sacamos antes se consultaron la lista de roles en un json
  const clientUpdate = await client.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // si esta vacio error al ediatr el error
  return !clientUpdate
    ? res.status(400).send("Error editing client")
    : res.status(200).send({ clientUpdate });
};

//ELIMINAR
//siempre lleva request y response
const deleteClient = async (req, res) => {
  const clientDelete = await client.findByIdAndDelete({
    _id: req.params["_id"],
  });

  //si no elimino nada
  return !clientDelete
    ? //angular le va a decir no muestro string a mi solo digame por json
      res.status(400).send("Client no found")
    : res.status(200).send("Client deleted");
};

//login
const login = async (req,res)=>{
//valdia que le llegue el email y el password delñ formulario
if(!req.body.email || !req.body.password)
  return res.status(400).send({message:"Incomplete data"});

  //busca si el email digitado esta registrado
  //recuerde que cualqueir find se trae todos los datos que estan en esa coleccion en este caso los datos del cliente 
  const clientLogin = await client.findOne({email:req.body.email});
  if(!clientLogin)
    return res.status(400).send({message: "Wrong email or password"});

    //compara con la q se esta recibiendo el json del formulario con  la q esta en la base de datos
  const hash = await bcrypt.compare(req.body.password,clientLogin.password);
  //si a comparacion  en hash no se dio vota el mensaje
  if(!hash)
    return res.status(400).send({message: "Wrong email or paswword"});
  try{
    //genero el  json web token
    return res.status(200).json({
     token: jwt.sign(
       {
         _id:clientLogin._id,
         name: clientLogin.name,
         iat: moment().unix(),
       },
       process.env.SK_JWT
     ) ,
    });
// se atrapa el error por q no se sabe que  pueda presentar de problema la  libreria del jwt son errores desconocidos no tenemos mensaje fijo ni nada
  }catch(error){
    //para el programador se deja ,error cuando este en produccion se quita el error 
    return res.status(400).send({message: "Login error"},error);
  }
  
};

//con este deja publico
//no hay geter and setter
//si es una funcion si lleva llaves
export default { registerClient, listClient, updateClient, deleteClient,login };
