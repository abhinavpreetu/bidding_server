const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeProject');
let db = mongoose.connection;

// check db connection
db.once('open',function() {
	console.log('Connected to mongodb');
});

// check db error
db.on('error',function(err) {

	console.log(err);
});

// init app
const app = express();

//models
let Article = require('./models/article');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//laod views
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// routes
app.get('/',function(req,res){
	Article.find({},function(err,articles) {
		if (err) {
			console.log(err);
		}
		else
		{
			res.render('index',{
				title: 'Articles',
				articles: articles
			});
		}
			
	});
});

app.get('/add_articles',function(req,res){

	res.render('addArticles',{
		'name':'macha'
	});
});

// add an article
app.post('/article',function(req,res){
	let article = new Article();

	article.title = req.body.title;
	article.author = req.body.author;
	article.body = req.body.body;

	article.save(function(err) 
	{
		if (err) {
			// console.log(err);
			// return;

			res.setHeader('Content-Type','application/json');
    		res.json(err);
		}
		else
		{
			//res.redirect('/');
			res.setHeader('Content-Type','application/json');
    		res.json({'message':'Success'});
		}
	});
});

// get details of an article
app.get('/article/:id',function(req,res) {
	Article.findById(req.params.id, function(err, article) {
		if (err) {

			res.setHeader('Content-Type','application/json');
    		res.json(err);
		}
		else
		{
			//res.setHeader('Content-Type','application/json');
    		res.json(article);
		}
	})
});

// update an article
app.put('/article/:id',function(req,res){
	let article = {};

	article.title = req.body.title;
	article.author = req.body.author;
	article.body = req.body.body;

	let query = {_id:req.params.id};
	var options = { runValidators: true };
	Article.updateOne(query, article, options, function(err) 
	{
		if (err) {
			// console.log(err);
			// return;

			res.setHeader('Content-Type','application/json');
    		res.json(err);
		}
		else
		{
			//res.setHeader('Content-Type','application/json');
    		res.json({'message':'Success'});
		}
	});
});

// delete an article
app.delete('/article/:id',function(req,res) {
	let query = {_id:req.params.id}
	Article.remove(query, function(err, article) {
		if (err) {

			res.setHeader('Content-Type','application/json');
    		res.json(err);
		}
		else
		{
			res.json({'message':'Success'});
		}
	})
});



app.listen(3000, function(argument){

	console.log('Server started on port 3000');
})