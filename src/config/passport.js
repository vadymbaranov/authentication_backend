import passport from 'passport';
import * as jwt from 'passport-jwt';
import fs from 'fs';
import { User } from '../models/Users.js';

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const PUB_KEY = fs.readFileSync('src/id_rsa_pub.pem', 'utf-8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

export default (passport) => {
  passport.use(new JwtStrategy(options, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function (err, user) {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null,false);
      }
    });
}))};
