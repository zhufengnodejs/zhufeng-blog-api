let { dbUrl } = require('../../config/config.default')();
let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let Schema = mongoose.Schema;
let conn = mongoose.createConnection(dbUrl);
exports.User = conn.model('User', new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
}));
exports.Article = conn.model('Article', new Schema({
    user: { type: ObjectId, ref: 'User' },
    title: String,
    content: String,
    pv: { type: Number, default: 0 },
    comments: [{ user: { type: ObjectId, ref: 'User' }, content: String, createAt: { type: Date, default: Date.now } }],
    createAt: { type: Date, default: Date.now }
}));