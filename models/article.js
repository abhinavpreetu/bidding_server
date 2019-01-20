let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({

	title: {
		type: String,
		required: [true, 'bla bla krti hai pimples']
	},
	author: {
		type: String,
		required: true,
		validate: { validator: abc, message: 'only abhinav can be the author.'}
	},
	body: {
		type: String,
		required: true
	}
});

let Article = module.exports = mongoose.model('Article',articleSchema);

function abc(value) {
	return value === 'abhinav';
}