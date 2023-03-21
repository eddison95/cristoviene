const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const SubGrupoSchema = mongoose.Schema({
    nombre_grupo: String,
    nombre_lider: String,
    primer_apellido_lider: String,
    segundo_apellido_lider: String,
    telefono_lider: Number,
    email: String,
    genero_lider: String,
    lugar: String,
    tipo_grupo: String,
    fecha_inicio: String,
    material: String,
    modalidad: String,
    frecuencia: String,
    id_grupo: String,
    miniature: String,
});

SubGrupoSchema.plugin(mongoosePaginate);  // Sirve para paginar 

module.exports = mongoose.model("SubGrupo",SubGrupoSchema);