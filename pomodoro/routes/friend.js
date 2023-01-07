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

router.get("/search/:query", async (req, res)=> {
    var query = req.params.query;
    res.render("search", {
        "query": query,
    });
    
    // const { email, pw } = req.body;
    // console.log(email);
    // const member = await memberModel.findOne({ email });
    // if (!member) {
    //     console.log("member not found!!");
    //     return res.redirect("login")
    // }
    // const verifyPW = await bcrypt.compare(pw, member.pw);
    // if (!verifyPW) {
    //     console.log("PW is incorrect!!");
    //     return res.redirect("login");
    // }
    // console.log("logging success");
    // req.session.isAuth=true;
    // req.session.name = member.id;
    // res.redirect("member");

    // User.find(id).populate('friends');

    // MongoClient.connect(DBUri,{useUnifiedTopology: true }, function (err, db) {
    //     let dbo = db.db(mongodbUrl);
    //     const query = {_id: objectId(req.params.id)}
    //     dbo.collection("Users").find(query).toArray(function(err, resultTasks) {
    //         if (err) throw err;
    //         res.render('../View/findFriend', {
    //             resultTasks: resultTasks
    //         });
    //         db.close();
    //     });
    // });

});

module.exports = router;
