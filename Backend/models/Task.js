const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title:{ type:String, required:true },
    description:{ type:String, default:"No Description" },
    imagePath: { type:String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true} ,
    // additional feature
    time: { type: String , default: null}
    // ==================
});


module.exports = mongoose.model('Task',taskSchema);