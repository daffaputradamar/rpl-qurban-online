const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models').User
const config = require('./database')

module.exports = (passport) => {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({
            where: {id: jwt_payload.data.id}
        }).then(user => {
            if (user) {
                return done(null, user)
            } else {
                return done(err, false)
            }
        }).catch(err => done(err))
    }))
}