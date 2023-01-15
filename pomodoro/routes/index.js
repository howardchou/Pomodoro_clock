var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.isAuth){
    res.render('index', { title: 'PomoClock' });
  }else{
    res.render('login');
  }
  
  // res.render('index', { title: 'PomoClock' });
});

module.exports = router;
