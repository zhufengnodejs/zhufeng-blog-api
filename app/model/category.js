module.exports=app => {
	const mongoose=app.mongoose;
	const Schema=mongoose.Schema;
	const ObjectId=Schema.Types.ObjectId;
	const CategorySchema=new Schema({
		name: { type: String, required: true }
	});
	return mongoose.model('Category',CategorySchema);
}