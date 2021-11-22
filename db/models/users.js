var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema(
{
    _someId		: Schema.Types.ObjectId,
    email		: { type: String, unique: true, required: false },
    password	: { type: String, required: false },
    username	: { type: String, unique: false },
    active		: { type: Boolean, default: true },
    height		: { type: Number, min: 54, max: 272, required: false },
    status		: { type: String, required: false },
    facebookID	: { type: String, unique: true, required: false },
    new			: { type: Boolean, default: true },
    updated_on	: { type: Date, default: Date.now() },
});

//Pre-hook: called before the User is saved in DB
UserSchema.pre(
	'save',
	async function(next) {
		if(this.password){
			const user = this; // Refers to the document about to be saved
			const hash = await bcrypt.hash(this.password, 10);

			this.password = hash;
		}
		next();
	});

UserSchema.methods.isValidPassword = async function(password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);

	return compare;
}

/*
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
*/

// UserSchema.plugin(passportLocalMongoose, passportOptions);

module.exports = mongoose.model('users', UserSchema );

