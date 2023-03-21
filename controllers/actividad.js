const Actividad = require("../models/actividades");
const image = require("../utils/image");

function createActividad(req,res){

    const actividad = new Actividad(req.body);

    const imagePath = image.getFilePath(req.files.miniature);
    actividad.miniature = imagePath;

  

    actividad.save((error, actividadStored) =>{
        if(error){
                res.status(400).send({msg: "Error al crear actividad"});
        }else{
            res.status(200).send({msg: "Actividad creada"});
        }
    });

};

function updateActividad (req,res){
    const { id } = req.params;
    const ActividadData  = req.body;

    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature);
        ActividadData.miniature = imagePath;
    }

    Actividad.findByIdAndUpdate({ _id: id},ActividadData,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al actualizar actividad"});
        }else{
            res.status(200).send({msg: "Actualizacion correcta"});
        }
    });
};

function getActividades(req,res){  // trae todas las actividades de un ministerio 
    const { id_ministerio } = req.params;

    Actividad.find({id_ministerio}, (error,actividadStored) =>{
        if(error){
            res.status(500).send({msg: "Error del servidor"});
        }else if(!actividadStored){
            res.status(400).send({msg: "No se encontro la actividad"});
        }else{
            res.status(200).send(actividadStored);
        }
    })



}

function deleteActividad(req,res){

    const { id } = req.params; 
   
    Actividad.findByIdAndDelete(id,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al eliminar actividad"});
        }else{
            res.status(200).send({msg: "Actividad eliminada"});
        }
    });

};

module.exports = {
    createActividad,
    updateActividad,
    getActividades,
    deleteActividad,
    
    
};
