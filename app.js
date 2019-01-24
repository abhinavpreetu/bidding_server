const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const expressValidator = require('express-validator');	
const session = require('express-session');

mongoose.connect('mongodb://localhost/nodeProject',{ useNewUrlParser: true });
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

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

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

let articles = require('./routes/articles');
app.use('/article', articles);


app.listen(3000, function(argument){

	console.log('Server started on port 3000');
})