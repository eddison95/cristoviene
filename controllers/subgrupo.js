const SubGrupo = require("../models/subgrupo");
const image = require("../utils/image");

function createSubGrupo(req,res){

    const subgrupo = new SubGrupo(req.body);
    console.log(subgrupo);

    const imagePath = image.getFilePath(req.files.miniature);
    subgrupo.miniature = imagePath;

    subgrupo.save((error, subGrupoStored) =>{
        if(error){
                res.status(400).send({msg: "Error al crear el subgrupo"});
        }else{
            res.status(200).send({msg: "SubGrupo creado"});
           
        }
    });

};


function getSubGrupos(req,res){  // trae todos los subgrupos de un grupo
    const { id_grupo } = req.params;

    SubGrupo.find({id_grupo}, (error,subGrupoStored) =>{
        if(error){
            res.status(500).send({msg: "Error del servidor"});
        }else if(!subGrupoStored){
            res.status(400).send({msg: "No se encontro el subgrupo"});
        }else{
            res.status(200).send(subGrupoStored);
        }
    })
 
}

function getSubGrupo(req,res){  // trae un solo subgrupo 
    const { _id } = req.params;
    

    SubGrupo.findById({ _id}, (error,subgrupoStored) =>{
        if(error){
            res.status(500).send({msg: "Error del servidor"});
        }else if(!subgrupoStored){
            res.status(400).send({msg: "No se encontro el subgrupo"});
        }else{
            res.status(200).send(subgrupoStored);
        }
    })
}

function updateSubGrupo(req,res){
    const { id } = req.params;
    const ActividadData  = req.body;

    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature);
        ActividadData.miniature = imagePath;
    }

    SubGrupo.findByIdAndUpdate({ _id: id},ActividadData,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al actualizar subGrupo"});
        }else{
            res.status(200).send({msg: "Actualizacion correcta"});
        }
    });
};



function deleteSubGrupo(req,res){

    const { id } = req.params; 
   
    SubGrupo.findByIdAndDelete(id,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al eliminar grupo"});
        }else{
            res.status(200).send({msg: "Grupo eliminado"});
        }
    });

};


module.exports = {
    createSubGrupo,
    getSubGrupos,
    deleteSubGrupo,
    updateSubGrupo,
    getSubGrupo,

    
};