var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema(
{
    _someId		: Schema.Types.ObjectId,
    username	: { type: String, unique: false },
    active		: { type: Boolean, default: true },
    height		: { type: Number, min: 54, max: 272, required: true },
    updated_on	: { type: Date, default: Date.now() }
})

//Passport capabilities is pluged in the UserSchema
var passportOptions = {
	usernameField : "email",
	usernameUnique : true,
	findByUsername: function(model, queryParameters) {
		// Add additional query parameter - AND condition - active: true
		queryParameters.active = true;
		return model.findOne(queryParameters);
	},
	errorMessages : {
		//Override the existing error message to reflect the use of the "email" field and not the default "username"
		UserExistsError : "A user with this email address already exists"
	}
}

UserSchema.plugin(passportLocalMongoose, passportOptions);

module.exports = mongoose.model('users', UserSchema );

