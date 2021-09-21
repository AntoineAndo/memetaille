var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema(
{
    _someId: Schema.Types.ObjectId,
    name		: String,
    active		: {type: Boolean, default: true },
    height		: { type: Number, min: 54, max: 272, required: true },
    email		: String,
    updated_on	: { type: Date, default: Date.now() }
})

//Passport capabilities is pluged in the UserSchema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', UserSchema );

