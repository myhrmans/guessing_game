import passport from 'passport';
import { BearerStrategy } from 'passport-azure-ad';

import dotenv from 'dotenv';
dotenv.config();

const config = {
    identityMetadata: `https://login.microsoftonline.com/${process.env.APP_TENANT_ID}/v2.0/.well-known/openid-configuration`, //v2 tenant-specific endpoint, required
    clientID: process.env.APP_CLIENT_ID,
  };

passport.use(new BearerStrategy(config, (token, done) => {
    console.log("token ", token)
    if (!token) {
      return done(null, false);
    }
    return done(null, token);
  }));

export default passport;