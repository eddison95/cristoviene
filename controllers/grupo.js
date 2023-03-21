const Grupo = require("../models/grupo");
const image = require("../utils/image");

function createGrupo(req,res){

    const grupo = new Grupo(req.body);

    const imagePath = image.getFilePath(req.files.miniature);
    grupo.miniature = imagePath;

    grupo.save((error, grupoStored) =>{
        if(error){
                res.status(400).send({msg: "Error al crear el grupo"});
        }else{
            res.status(200).send({msg: "Grupo creado"});
           
        }
    });

};

function getGrupos(req,res){
    const {page = 1, limit = 10 } = req.query;  // paginar 

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    Grupo.paginate({},options,(error,grupos) => {
        if(error){
            res.status(400).send({msg: "Error al obtener grupos"});
        }else{
            res.status(200).send(grupos);
        }
    });  
};

function updateGrupo (req,res){
    const { id } = req.params;
    const GrupoData  = req.body;

    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature);
        GrupoData.miniature = imagePath;
    }

    Grupo.findByIdAndUpdate({ _id: id},GrupoData,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al actualizar grupo"});
        }else{
            res.status(200).send({msg: "Actualizacion correcta"});
        }
    });
};

function deleteGrupo(req,res){

    const { id } = req.params; 
   
    Grupo.findByIdAndDelete(id,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al eliminar el grupo"});
        }else{
            res.status(200).send({msg: "Grupo eliminado"});
        }
    });

};

module.exports = {
    createGrupo,
    getGrupos,
    updateGrupo,
    deleteGrupo,
    
};