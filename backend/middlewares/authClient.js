import jwt from "jsonwebtoken";

const authClient = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token)
    return res.status(400).send({ message: "Authorization denied: No token" });

  //en postman losiguiente daña eñ formato:  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0MGMxOTE2MWM2ZmFmNTBiMzA0YzAiLCJuYW1lIjoiUGVwaXRhIFBlcmxhIiwicm9sZUlkIjoiNjE5M2Q3MzgyOTI5MWZkMmZkNDg1Mjk4IiwiaWF0IjoxNjM3MDkyMzc3fQ.BdOu6rNQgsoy8yBYPdwlmnw1W2XNm7hHIohlu18VoTQ

  //toma todo el token y lo separa por 1 espacio
  //token solo tiene  la clave ahiq uito el beared
  token = token.split(" ")[1];
  //no hay token autorizacion denegada
  if (!token)
    return res.status(400).send({ message: "Authorization denied: No token" });
  try {
    req.user = jwt.verify(token, process.env.SK_JWT);
    next();
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Authorization denied:Invalida token" });
  }
};
export default authClient;