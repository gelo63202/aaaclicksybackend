const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { googleId: profile.id } });
      if (!user) {
        const referralLink = `https://clicksy.com/?ref=${generateReferralCode()}`;
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          referralLink,
        });
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
));

function generateReferralCode() {
  return Math.random().toString(36).substring(2, 15);
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

module.exports = passport;