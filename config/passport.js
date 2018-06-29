const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models').User
const Mosque = require('../models').Mosque
const config = require('./database')

module.exports = (passport) => {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = config.secret;
    passport.use('jwt-user', new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({
            where: {
                id: jwt_payload.data.id,
                email: jwt_payload.data.email
            }
        }).then(user => {
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        }).catch(err => done(err))
    }))
    passport.use('jwt-mosque', new JwtStrategy(opts, (jwt_payload, done) => {
        Mosque.findOne({
            where: {
                id: jwt_payload.data.id,
                email: jwt_payload.data.email
            }
        }).then(mosque => {
            if (mosque) {
                return done(null, mosque)
            } else {
                return done(null, false)
            }
        }).catch(err => done(err))
    }))
}