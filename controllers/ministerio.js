const Ministerio = require("../models/ministerio");
const image = require("../utils/image");

function createMinisterio(req,res){

    const ministerio = new Ministerio(req.body);

    const imagePath = image.getFilePath(req.files.miniature);
    ministerio.miniature = imagePath;

    ministerio.save((error, ministerioStored) =>{
        if(error){
                res.status(400).send({msg: "Error al crear el ministerio"});
        }else{
            res.status(200).send({msg: "Ministerio creado"});
           
        }
    });

};

function getMinisterios(req,res){
    const {page = 1, limit = 10 } = req.query;  // paginar 

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    Ministerio.paginate({},options,(error,ministerios) => {
        if(error){
            res.status(400).send({msg: "Error al obtener ministerios"});
        }else{
            res.status(200).send(ministerios);
        }
    });  
};

function getMinisterio(req,res){  // trae un solo ministerio 
    const { _id } = req.params;
    

    Ministerio.find({ _id}, (error,ministerioStored) =>{
        if(error){
            res.status(500).send({msg: "Error del servidor"});
        }else if(!ministerioStored){
            res.status(400).send({msg: "No se encontro el ministerio"});
        }else{
            res.status(200).send(ministerioStored);
        }
    })
}

function updateMinisterio (req,res){
    const { id } = req.params;
    const MinisterioData  = req.body;

    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature);
        MinisterioData.miniature = imagePath;
    }

    Ministerio.findByIdAndUpdate({ _id: id},MinisterioData,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al actualizar ministerio"});
        }else{
            res.status(200).send({msg: "Actualizacion correcta"});
        }
    });
};

function deleteMinisterio(req,res){

    const { id } = req.params; 
   
    Ministerio.findByIdAndDelete(id,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al eliminar el ministerio"});
        }else{
            res.status(200).send({msg: "Ministerio eliminado"});
        }
    });

}

module.exports = {
    createMinisterio,
    getMinisterios,
    updateMinisterio,
    deleteMinisterio,
    getMinisterio,
};
