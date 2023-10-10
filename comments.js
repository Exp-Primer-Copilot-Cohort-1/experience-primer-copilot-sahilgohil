// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var comments = require('./comments.json');
var _ = require('lodash');

// Set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// Set port
var port = process.env.PORT || 8080;

// Set router
var router = express.Router();

// Set router middleware
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

// Set router
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// Set router
router.route('/comments')
  // Get all comments
  .get(function(req, res) {
    res.json(comments);
  })
  // Create a comment
  .post(function(req, res) {
    var comment = {
      id: _.uniqueId('comment_'),

      name: req.body.name,
      comment: req.body.comment,
      date: req.body.date
    };
    comments.push(comment);
    fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.json({ message: 'comment created!' });
    });
  });