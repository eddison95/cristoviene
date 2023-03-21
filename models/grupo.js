const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const GrupoSchema = mongoose.Schema({
    nombre_grupo: String,
    descripcion: String,
    lider: String,
    miniature: String,
    

});

GrupoSchema.plugin(mongoosePaginate);  // Sirve para paginar 

module.exports = mongoose.model("Grupo",GrupoSchema);