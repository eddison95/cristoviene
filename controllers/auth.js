const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

function register(req,res){
    const {firstname,lastname,email,password} = req.body;

    if (!email) res.status(400).send({msg: "Email es necesario"});
    if (!password) res.status(400).send({msg: "Password es necesario"});

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,
    });

    // Sirve para encriptar la password 
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password,salt);
    user.password = hashPassword;

    user.save((error,userStorage) => {
        if(error) {
            res.status(400).send({msg: "El usuario ya existe"});
        }else{
            res.status(200).send(userStorage);
        }
    });
}

function login (req,res){

    const {email,password} = req.body;

    if(!email) res.status(400).send({msg: "El email es obligatorio"});
    if(!password) res.status(400).send({msg: "La clave es obligatoria"});

    const emailLowerCase = email.toLowerCase();
// Busca en usuario en la base de datos
    User.findOne({email: emailLowerCase} ,(error,userStore)=> {
       if(error){
        res.status(400).send({msg:"No se encontro en usuario"})
       } else{
       bcrypt.compare(password,userStore.password, (bcryptError, check)=>{
            if(bcryptError){
                res.status(500).send({msg: "Error de credenciales"});
            }else if(!check){
                res.status(400).send({msg:"Password incorrecto"});
            }else if(!userStore.active){
                res.status(401).send({msg: "Usuario inactivo"});
            }else{
                res.status(200).send({ //result: "OK",
                   access: jwt.createAccessToken(userStore),
                    refresh: jwt.createRefreshToken(userStore) ,
                });
            }
       });
       }
    });
}

function refreshAccessToken(req,res){
    const  {token} = req.body;  // obtiene el token

    if(!token)res.status(400).send({msg: "token requerido"});

    const {user_id} = jwt.decoded(token); // obtiene el id del usuario a partir del token

    User.findOne({_id: user_id},(error,userStorage) =>{  // busca si existe algun usuario con ese id
        if(error){
            res.status(500).send({msg: "Error de servidor"});
        }else{
            res.status(200).send({     // devuelve un nuevo token
                accessToken: jwt.createAccessToken(userStorage),
            });
        }
    });
}

module.exports={
    register,
    login,
    refreshAccessToken
};