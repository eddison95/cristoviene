const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const MinisterioSchema = mongoose.Schema({
    title: {
        type: String,
        unique: false,
    },
    miniature: String,
    description: String,
    lideres: String,
    cantidad_personas: Number,
    url: String,
    presupuesto: Number,
    score: Number,
    content: String,
});

MinisterioSchema.plugin(mongoosePaginate);  // Sirve para paginar 

module.exports = mongoose.model("Ministerio",MinisterioSchema);