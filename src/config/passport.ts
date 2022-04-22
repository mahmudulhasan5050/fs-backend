import passport from 'passport'
import passportLocal from 'passport-local'

//declaration mergin
import GoogleIdTokenStrategy from 'passport-google-id-token'
import { Request, Response, NextFunction } from 'express'
import JwtStrategy from 'passport-jwt'

import { GOOGLE_CLIENT_ID, JWT_SECRET } from '../util/secrets'
import usersService from '../services/users'

//const LocalStrategy = passportLocal.Strategy

export const googleStrategy = new GoogleIdTokenStrategy(
  {
    clientId: GOOGLE_CLIENT_ID,
  },
  (parsedToken: any, googleId: any, done: any) => {
    //console.log('parsedToken', parsedToken)
    //console.log('googleId', googleId)

    usersService
      .findOrCreate(parsedToken)
      .then((user) => {
        done(null, user)
      })
      .catch((err) => {
        console.log(err)
      })
  }
)

export const jwtStrategy = new JwtStrategy.Strategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (payload: any, done: any) => {
    console.log('payload', payload)
    const email = payload.email
    usersService
      .findByEmail(email)
      .then((user) => {
        done(null, user)
      })
      .catch((err) => {
        console.log(err)
      })
  }
)
