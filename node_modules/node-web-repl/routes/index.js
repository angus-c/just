var util = require('util');

exports.api = function(req, res) {
	// var eval = (1,eval);
	var code = req.body.method+' '+req.body.params.join(' ');
	var evalError;
	var result;
	try {
		result = util.inspect(eval(code), true, 10);
		console.log(result);
		evalError = null;
	} catch (error) {
		console.log(error);
		evalError = {message: error.toString()};
		result = null;
	}
	var out = {result:result, error:evalError, id:req.body.id};
	res.send(out);
};

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};
