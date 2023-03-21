const mongoose = require("mongoose");


const MenuSchema = mongoose.Schema({
    title: String, // Texto que se muestra
    path: String,  // URL
    order: Number, // Posicion de menu 
    active: Boolean,
});


module.exports = mongoose.model("Menu",MenuSchema);

