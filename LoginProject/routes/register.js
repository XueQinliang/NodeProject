var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//router.use(bodyParser.urlencoded({extended: false}));
//router.use(bodyParser.json())
router.get('/',function(req,res,next) {
    res.render("register",{title:'欢迎注册'});
});
router.post('/show', bodyParser.urlencoded({extended: false}), (req, res, next) => {
  var response = {
    "username":req.body.username,
    "password":req.body.password,
    "password2":req.body.password2
  };
  console.log(req.body);
  res.end(JSON.stringify(response));
});
module.exports = router;
