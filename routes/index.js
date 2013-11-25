/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.helloworld = function(req, res){
  res.render('helloworld', { title: 'Hello, World!' });
};

exports.directory = function(db) {
	return function(req, res) {
	    var collection = db.get('employeelist');
	    var criteria = {};
	    if(req.param('first')!="All"){criteria.first =req.param('first')};
	    if(req.param('last')!="All"){criteria.last =req.param('last')};

	    collection.find(criteria,{},function(e,docs){
	        res.jsonp(docs);
	    });
	}
};