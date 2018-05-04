module.exports=app => {
	const mongoose=app.mongoose;
	const Schema=mongoose.Schema;
	const ObjectId=Schema.Types.ObjectId;
	const ArticleSchema=new Schema({
		user: {type: ObjectId,ref: 'User'},
		category: { type: ObjectId, ref: 'Category' },
		title: String,
		content: String,
		pv: { type: Number, default: 0 },
		comments: [{ user: { type: ObjectId, ref: 'User' }, content: String, createAt: { type: Date, default: Date.now } }],
		createAt: { type: Date, default: Date.now }
	});
	return mongoose.model('Article',ArticleSchema);
}