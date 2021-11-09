import vendors from "../models/vendors.js";
//Crear el proceso para registrar proveedores (name, address, registerDate.)
const registerVendors = async (req, res) => {

  if (!req.body.name || !req.body.address  ) 
 
    return res.status(400).send("Incomplete data");
  



const existingVendors = await vendors.findOne({name: req.body.name});

  if (existingVendors) return res.status(400).send("The vendors already exist");
 
  const vendorsSchema = new vendors({
      name: req.body.name,
      address: req.body.address,
  })

  const result = await vendorsSchema.save();
  
   if(!result) return res.status(400).send("Failed to register Vendors");
   
   
   return res.status(200).send({result});

};


const listVendors= async (req, res)=> {

  const vendorsSchema = await vendors.find();

  if(!vendorsSchema || vendorsSchema.length == 0 ) return res.status(400).send("Empty vendors list");

  return res.status(200).send({vendorsSchema})
}

//editar role ACTUALIZAR
//para editar el rol l da a una pestañita y le entrega los datos el necesita ir a buscar un id
//el update es muy parecido al registrar el registro no permite q esos campos esten vacios
const updateVendors =async(req, res) =>{//ADMIN
  //no  deja estar vacios
  if (!req.body.name || !req.body.address ) 
    //400 hay un error algo salio mal no llegaron alguno de los datos
    return res.status(400).send("Incomplete data");

 
 //comete el error de reemplaza lo q esta por lo mismo no lo deja  con esto evita que haga todo el proceso de sobreescritura del mismo dato no se de si es el mismo usuario
const existingVendors = await vendors.findOne({name: req.body.name,address:req.body.address });
if(existingVendors) return res.status(400).send("The vendors already exist");


//busca por el id y apenas lo encuentre actualiza
//por q carajos uso body por q esta usando el json del listado que sacamos antes se consultaron la lista de roles en un json 
  const vendorsUpdate = await vendors.findByIdAndUpdate(req.body._id,{name: req.body.name,address:req.body.address })

  // si esta vacio error al ediatr el error
  return !vendorsUpdate 
  ? res.status(400).send("Error editing vendors") 
  : res.status(200).send({vendorsUpdate});
}


//ELIMINAR
//siempre lleva request y response
const deleteVendors = async(req,res)=>{
  const vendorsDelete = await vendors.findByIdAndDelete({_id: req.params["_id"]})

  //si no elimino nada
  return !vendorsDelete 
  //angular le va a decir no muestro string a mi solo digame por json
  ? res.status(400).send("Vendors no found")
  : res.status(200).send("Vendors deleted")
}



export default {registerVendors,listVendors,updateVendors,deleteVendors};