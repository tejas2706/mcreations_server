let jwt = require('jsonwebtoken');
const Promise = require("bluebird");
const User = require("../db/models").getModel("users");
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;
Promise.promisifyAll(jwt)

passport.use(new LocalStrategy(
    function (username, password, done) {
    console.log("username", username)
        User.findAndCheck(username, password)
            .then(user => {
                let userObject = {
                    username: username
                }
                if(user.isAdmin){
                    userObject.isAdmin = true;
                }
                let token = jwt.sign(userObject, config.get("auth.jwt.secret"), {
                    expiresIn: config.get("auth.jwt.expiresIn")
                })
                console.log("TCL: token", token)
                return done(null, {
                    token: token,
                    username: username,
                    isAdmin: user.isAdmin
                });
            })
            .catch(e => {
                console.log(e);
                done(null, {
                    token: false,
                })
            })
    }
));
passport.use(new BearerStrategy(
    function (token, done) {
        console.log(token)
        done(null,true)
        jwt.verifyAsync(token, config.get("auth.jwt.secret")).then((data) => {
            User.findOne({
                username: data.username
            }).then(user => {
                done(null, user);
            }).catch(e => {
                console.info(e);
                done(null, false)
            });
        }).catch(e => {  
            console.info(e);
            done(null, false);
        });
    }
));

function signup(req, res, next) {

    try{
        console.log("TCL: signup -> req", req.body)
        if (!req.body.username || !req.body.password || !req.body.adminPassword) {
            res.json({
                success: false,
                msg: 'Please pass username, password and admin password.'
            });
        } else {
            if(req.body.adminPassword != config.get("auth.adminPassword")){
                return res.status(401).json({
                    success: false,
                    msg: "Admin Password does not match"
                })
            }
            var newUser = {
                username: req.body.username,
                password: req.body.password,
                emailId: req.body.emailId,
                isAdmin: req.body.isAdmin || false
            };
            // save the user
            User.create(newUser).then(() => {
                res.json({
                    success: true,
                    msg: 'Successful created new user.'
                });
            }).catch(err => {
                console.log('err', err)
                if (err) {
                    return res.json({
                        success: false,
                        msg: err.msg || err.errmsg
                    });
                }
            });
        }
    }catch(err){
        console.log("signup -> err", err)
        return res.status(401).send(err);
    }
}
module.exports.init = function (app) {
    app.post("/signup", signup);
    app.use("/login", passport.authenticate("local", {
        session: false
    }), function (req, res, next) {
        res.send(req.user)
    })
    // app.use("/", passport.authenticate("bearer", {
    //     session: false,
    //     authenticate: false
    // }))
};