import admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerAdmin = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const existingAdmin = await admin.findOne({ email: req.body.email });
  if (existingAdmin)
    return res.status(400).send({ message: "The admin is already registered" });

  const passHash = await bcrypt.hash(req.body.password, 10);

 

  const adminRegister = new admin({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    dbStatus: true,
  });

  const result = await adminRegister.save();
  //RECUERDE QUE EL ADMIN NO PUEDE QUEDAR LOGUEADO POR ESO NO SE USA EL TRY CATCH COMO USUARIO NORMAL
   return !result
     ? res.status(400).send({ message: "Failed to register admin" })
     : res.status(200).send({ message: "Succes register admin" });

};



const listAdmins = async (req, res) => {
  const adminList = await admin.find();
  return adminList.length === 0
    ? res.status(400).send({ message: "Empty admins list" })
    : res.status(200).send({ adminList });
};

const findAdmin = async (req, res) => {
  const adminfind = await admin.findById({ _id: req.params["_id"] });
  return !adminfind
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ adminfind });
};

const updateAdmin = async (req, res) => {
  if (!req.body.name || !req.body.email )
    return res.status(400).send({ message: "Incomplete data" });

  const changeEmail = await admin.findById({ _id: req.body._id });
  if (req.body.email !== changeEmail.email)
    return res
      .status(400)
      .send({ message: "The email should never be changed" });
// si no coloco nada en la contraseña la inicializa en vacio ""
  let pass = "";
//si le coloco contraseña traigame la contraseña q coloco
  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
//sino deje la contraseña q tenia  antes por q esta vacio para q no se actualize
  } else {
    const adminFind = await admin.findOne({ email: req.body.email });
    pass = adminFind.password;
  }

  //arma el objeto con la info sacada y va y busca cada atributo haber si hay un objeto exactamente identico
  const existingAdmin = await admin.findOne({
    name: req.body.name,
    email: req.body.email,
    password: pass,
    
  });
 //PROFE AYUDA NO PUDE COMO HAGO PARA REVISAR POR Q SON IGUALES Y NO DICE ESO
  if (existingAdmin) 
   return res.status(400).send({ message: "you didn't make any changes" });
 
    //si no actualiza lo diferente 
  const adminUpdate = await admin.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
   
  });

  return !adminUpdate
    ? res.status(400).send({ message: "Error editing admin" })
    : res.status(200).send({ message: "Admin updated" });
};

const deleteAdmin = async (req, res) => {
  const adminDelete = await admin.findByIdAndDelete({ _id: req.params["_id"] });
  return !adminDelete
    ? res.status(400).send({ message: "Admin no found" })
    : res.status(200).send({ message: "Admin deleted" });
};

const loginAdmin = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const adminLogin = await admin.findOne({ email: req.body.email });
  if (!adminLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  const hash = await bcrypt.compare(req.body.password, adminLogin.password);
  if (!hash)
    return res.status(400).send({ message: "Wrong email or password" });

  // return !userLogin
  //   ? res.status(400).send({ message: "User no found" })
  //   : res.status(200).send({ userLogin });

  try {
    return res.status(200).json({
      token: jwt.sign({
        _id: adminLogin._id,
        name: adminLogin.name,
        iat: moment().unix(),
      },
      process.env.SK_ADM
      ),
    });
  } catch (error) {
    return res.status(400).send({mesaage:"Login error"});
  }
};

export default {
  registerAdmin,
  listAdmins,
  findAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
};
