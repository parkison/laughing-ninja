/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.helloworld = function(req, res){
  res.render('helloworld', { title: 'Hello, World!' });
};

var Employee = require('../models/employee.js');

exports.directory = function() {
	return function(req, res) {
	    var criteria = {};
	    if(req.param('first')!="All"){criteria.first =req.param('first')};
	    if(req.param('last')!="All"){criteria.last =req.param('last')};
	    if(req.param('age')!="All"){criteria.age =req.param('age')};

	    Employee.find(criteria,{},function(e,docs){
	        res.jsonp(docs);
	    });
	}
};

exports.addperson = function() {
	return function(req, res) {
	    var newguy = new Employee({first:req.param('first'),last:req.param('last'),age:req.param('age')})

	    newguy.save(function (err) {
	      if (err) // ...
	      console.log('meow?');
	    });
	}
};