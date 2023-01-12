var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('', function (req, res, next) {
    if(req.session.isAuth){
        res.render('friend', { title: 'Friend' });
    }else{
        res.render('login');
    }
    // res.render('friend', { title: 'Friend' });
});

//search user by username
router.get("/:query", async (req, res)=> {
    var query = req.params.query;
    res.render("friendSearch", {
        "query": query,
        title: 'friend search',
    });
    
    // var searchfriend = req.body.searchfriend;
    // if(searchfriend) {
    //     var mssg= '';
    //     if (searchfriend == req.user.username) {
    //         searchfriend= null;
    //     }
    //     User.find({username: searchfriend}, function(err, result) {
    //         if (err) throw err;
    //             res.render('search', {
    //             "query": searchfriend,
    //             result: result,
    //             mssg : mssg
    //         });
    //     });	
    // }
});

module.exports = router;
