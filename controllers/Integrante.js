const Integrante = require("../models/integrantes");
//const image = require("../utils/image");

function createIntegrante(req,res){

    const integrante = new Integrante(req.body);
  //  console.log(subgrupo);

   // const imagePath = image.getFilePath(req.files.miniature);
  //  subgrupo.miniature = imagePath;

    integrante.save((error, integranteStored) =>{
        if(error){
                res.status(400).send({msg: "Error al crear el integrante"});
        }else{
            res.status(200).send({msg: "Integrante creado"});
           
        }
    });

};


function getIntegrante(req,res){  // trae todos los integrantes de un grupo
    const { id_subgrupo } = req.params;

    Integrante.find({id_subgrupo}, (error, integranteStored) =>{
        if(error){
            res.status(500).send({msg: "Error del servidor"});
        }else if(!integranteStored){
            res.status(400).send({msg: "No se encontro el integrante"});
        }else{
            res.status(200).send(integranteStored);
        }
    })
}

function getIntegrantes(req,res){
    const {page = 1, limit = 10 } = req.query;  // paginar 

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    Integrante.paginate({},options,(error,integrantes) => {
        if(error){
            res.status(400).send({msg: "Error al obtener integrantes"});
        }else{
            res.status(200).send(integrantes);
        }
    });  
};

function updateIntegrante(req,res){
    const { id } = req.params;
    const IntegranteData  = req.body;

    Integrante.findByIdAndUpdate({ _id: id},IntegranteData,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al actualizar integrante"});
        }else{
            res.status(200).send({msg: "Actualizacion correcta"});
        }
    });
};






function deleteIntegrante(req,res){

    const { id } = req.params; 
   
    Integrante.findByIdAndDelete(id,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al eliminar integrante"});
        }else{
            res.status(200).send({msg: "Integrante eliminado"});
        }
    });

};


module.exports = {
    createIntegrante,
    getIntegrante,
    updateIntegrante,
    deleteIntegrante,
    getIntegrantes,
    

    
};