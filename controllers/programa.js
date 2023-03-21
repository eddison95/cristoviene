const Programa = require("../models/programas");
const image = require("../utils/image");

function createPrograma(req,res){

    const programa = new Programa(req.body);

    programa.save((error, programaStored) =>{
        if(error){
                res.status(400).send({msg: "Error al crear el programa"});
        }else{
            res.status(200).send({msg: "Programa creado"});
           
        }
    });

};

function getPrograma(req,res){
    const {page = 1, limit = 10 } = req.query;  // paginar 

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    Programa.paginate({},options,(error,programas) => {
        if(error){
            res.status(400).send({msg: "Error al obtener programas"});
        }else{
            res.status(200).send(programas);
        }
    });  
};

function getMinisterio(req,res){  // trae un solo post 
    const { title } = req.params;

    Ministerio.findOne({title}, (error,ministerioStored) =>{
        if(error){
            res.status(500).send({msg: "Error del servidor"});
        }else if(!ministerioStored){
            res.status(400).send({msg: "No se encontro el ministerio"});
        }else{
            res.status(200).send(ministerioStored);
        }
    })



}

function updatePrograma (req,res){
    const { id } = req.params;
    const ProgramaData  = req.body;

    Programa.findByIdAndUpdate({ _id: id},ProgramaData,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al actualizar programa"});
        }else{
            res.status(200).send({msg: "Actualizacion correcta"});
        }
    });
};

function deletePrograma(req,res){

    const { id } = req.params; 
   
    Programa.findByIdAndDelete(id,(error) =>{
        if(error){
            res.status(400).send({msg: "Error al eliminar el programa"});
        }else{
            res.status(200).send({msg: "Programa eliminado"});
        }
    });

}

module.exports = {
    createPrograma,
    getPrograma,
    updatePrograma,
    deletePrograma,
    
};
