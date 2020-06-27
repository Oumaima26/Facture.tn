const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
//const Commercant = mongoose.model("Commercant");
const Commercant = require('../models/Commerçant.model');
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Commercant.findById(jwt_payload.id)
        .then(commercant => {
          if (commercant) {
            return done(null, commercant);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
