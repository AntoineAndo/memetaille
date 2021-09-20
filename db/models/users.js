

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
{
    _someId: Schema.Types.ObjectId,
    name: String,
    active: Boolean,
    updated_on: { type: Date, default: Date.now() },
    height: { type: Number, min: 54, max: 272, required: true }
})

module.exports = mongoose.model('users', UserSchema );

