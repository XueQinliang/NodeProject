var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json())
router.get('/',function(req,res,next) {
  res.render("login",{title:'欢迎登陆'});
});
router.post('/show', function(req, res, next){
  /*req.on('data',function(data){
		obj=JSON.parse(data);
		console.log(obj);
		res.send('数据已接收')
	})*/
  console.log(req.body);
  var response = {
    "username":req.body.username,
    "password":req.body.password
  };
  console.log('这是后端');
  res.end(JSON.stringify(response));
});

module.exports = router;
