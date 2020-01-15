let jwt = require('jsonwebtoken');
const Promise = require("bluebird");
const User = require("../db/models").getModel("users");
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;
Promise.promisifyAll(jwt)

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findAndCheck(username, password)
            .then(user => {
                let token = jwt.sign({
                    username: username
                }, config.get("auth.jwt.secret"), {
                    expiresIn: config.get("auth.jwt.expiresIn")
                })
                return done(null, {
                    token: token
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
    console.log("TCL: signup -> req", req.body)
    if (!req.body.username || !req.body.password) {
        res.json({
            success: false,
            msg: 'Please pass username and password.'
        });
    } else {
        var newUser = {
            username: req.body.username,
            password: req.body.password,
            emailId: req.body.emailId
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
}
module.exports.init = function (app) {
    app.post("/signup", signup);
    app.use("/login", passport.authenticate("local", {
        session: false
    }), function (req, res, next) {
        res.send(req.user)
    })
    app.use("/", passport.authenticate("bearer", {
        session: false,
        authenticate: false
    }))
};