var express = require('express');
var router = express.Router();

var allList = [];
var id = 1;
console.log("Loading");
router.post('/addList', function(req, res) {
    var newTodo = {
        "id": id,
        "title": req.body.title,
        "msg": req.body.msg,
        "status": false
    };
    allList.push(newTodo);
    id++;
    res.json({ "status": 0, "msg": "success", "data": newTodo });
});
router.get('/getList', function(req, res) {
    res.json(allList);
});
router.post('/updateList', function(req, res) {
    var id = req.body.id;
    var index = allList.findIndex(element => element.id == id);
    allList[index].title = req.body.title;
    allList[index].msg = req.body.msg;
    res.json({ "status": 0, "msg": "success" });
});

router.post('/removeList', function(req, res) {
    var id = req.body.id;
    var index = allList.findIndex(element => element.id == id);
    allList.splice(index, 1);
    res.json({ "status": 0, "msg": "success" });
});

router.post('/checkStatus', function(req, res) {
    var id = req.body.id;
    var index = allList.findIndex(element => element.id == id);
    allList[index].status = allList[index].status ? "false" : "true";
    res.json({ "status": 0, "msg": "success" });
});
module.exports = router;