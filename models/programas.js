const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const ProgramaSchema = mongoose.Schema({
    title: {
        type: String,
        unique: false,
    },
    fecha: String,
    descripcion: String,
    content: String,
});

ProgramaSchema.plugin(mongoosePaginate);  // Sirve para paginar 

module.exports = mongoose.model("Programa",ProgramaSchema);