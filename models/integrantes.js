const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const IntegranteSchema = mongoose.Schema({
    nombre_integrante: String,
    apellidos_integrante: String,
    telefono_integrante: String,
    genero_integrante: String,
    id_subgrupo: String,
    sub_grupo: String,
    nombre_lider: String,
    apellido_lider: String,
    
});

IntegranteSchema.plugin(mongoosePaginate);  // Sirve para paginar 

module.exports = mongoose.model("Integrante",IntegranteSchema);