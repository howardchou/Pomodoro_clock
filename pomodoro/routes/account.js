var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.isAuth){
        res.render('account', { title: 'Account' });
    }else{
        res.render('login');
    }
    
});
router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) throw err;
            res.clearCookie("connect.sid");
            return res.redirect("/account");
        });
    }
});

module.exports = router;
