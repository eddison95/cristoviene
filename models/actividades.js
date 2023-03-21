const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const ActividadesSchema = mongoose.Schema({
    ministerio: {
        type: String,
       
    },
    miniature: String,
    title: String,
    content: String,
    dia: String,
    id_ministerio: String,
});

ActividadesSchema.plugin(mongoosePaginate);  // Sirve para paginar 

module.exports = mongoose.model("Actividades",ActividadesSchema);