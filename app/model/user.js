module.exports=app => {
	const mongoose=app.mongoose;
	const Schema=mongoose.Schema;
	const ObjectId=Schema.Types.ObjectId;
	const UserSchema=new Schema({
		username: {type: String,required: true},
		avatar:{type:String},
		password: {type: String,required: true},
		email: {type: String,required: true}
	});
	return mongoose.model('User',UserSchema);
}