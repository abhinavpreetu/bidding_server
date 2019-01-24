const express = require('express');
const router = express.Router();

// Article Model
let Article = require('../models/article');

// add an article
router.post('/add',function(req,res){

	req.checkBody('title','Title is required.').notEmpty();
	req.checkBody('author','Author is required.').notEmpty();
	req.checkBody('body','Body is required.').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
	    res.json(errors);
	}
	else
	{
		let article = new Article();

		article.title = req.body.title;
		article.author = req.body.author;
		article.body = req.body.body;

		article.save(function(err) 
		{
			if (err) {
				
	    		res.json(err);
			}
			else
			{
				//res.redirect('/');
				res.setHeader('Content-Type','application/json');
	    		res.json({'message':article});
			}
		});
	}
});

// get details of an article
router.get('/get/:id',function(req,res) {
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
router.put('/update/:id',function(req,res){

	req.checkBody('title','Title is required.').notEmpty();
	req.checkBody('author','Author is required.').notEmpty();
	req.checkBody('body','Body is required.').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
	    res.json(errors);
	}
	else
	{
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
	}
});

// delete an article
router.delete('/delete:id',function(req,res) {
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

module.exports =router;
