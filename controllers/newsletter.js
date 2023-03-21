const Newsletter = require("../models/newsletter");




function susbcribeEmail(req,res){

    const { email }  = req.body;

    if(!email){
        res.status(500).send({msg: "Debe ingresar email"});
    }

    const newsletter = new Newsletter({
        email: email.toLowerCase(),

    });

    newsletter.save((error) =>{
        if(error){
                res.status(400).send({msg: "Email ya se encuentra registrado"});
        }else{
            res.status(200).send({msg: "Email registrado"});
        }
    });
};

function getEmails(req,res){  // trae todos los correos 

    const { page = 1,limit = 10 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    Newsletter.paginate({},options,(error,emailsStored) => {
        if(error){
            res.status(400).send({msg: "Error al obtener emails"});
        }else{
            res.status(200).send(emailsStored);
        }
    }); 
}

function deleteEmail(req,res){  // Elimina email

    const { id } = req.params; 
   
    Newsletter.findByIdAndDelete(id,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al eliminar email"});
        }else{
            res.status(200).send({msg: "Email eliminado"});
        }
    });
};

module.exports={
    susbcribeEmail,
    getEmails,
    deleteEmail,
    
};