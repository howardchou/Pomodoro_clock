const express = require("express");
const router = express.Router();
const memberModel = require("../model/member");
const bcrypt = require("bcrypt");


router.get("/login", (req, res) => {
    res.render('login', { title: 'session login登入' })
});

router.post("/login", async (req, res) => {
    const { email, pw } = req.body;
    console.log(email);
    const member = await memberModel.findOne({ email });
    if (!member) {
        console.log("member not found!!");
        return res.redirect("login")
    }
    const verifyPW = await bcrypt.compare(pw, member.pw);
    if (!verifyPW) {
        console.log("PW is incorrect!!");
        return res.redirect("login");
    }
    req.session.isAuth = true;
    req.session.name = member.id;
    res.redirect("/account");
});

router.get("/register", (req, res) => {
    res.render('register', { title: 'session register註冊' })
});
router.post("/register", async (req, res) => {
    const { id, email, pw } = req.body;
    if (!id || !email || !pw) {
        console.log("no data", id, email, pw);
        return res.redirect("register")
    }//確認是否有使用者資料
    const hashPW = await bcrypt.hash(pw, 10);
    let member = await
        memberModel.findOne({ email });
    if (member) {
        console.log("email has registered")
        return res.redirect("./register");
    }//確認有無註冊

    member = new memberModel({ id, email, pw: hashPW });
    const result = await member.save();
    res.redirect("login")
});
const isAuth = (req, res, next) => {
    if (!req.session.isAuth) return res.redirect("login");
    next();
};



module.exports = router;