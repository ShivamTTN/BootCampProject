var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
    new GoogleStrategy(
      {
        clientID:
          "237219586250-gqhrjtime2v21qe1rfkb1llnd1s8v8l0.apps.googleusercontent.com",
        clientSecret: "8FMfl56o4zn3aW0BMsN8PXnI",
        callbackURL: "/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        // if (profile._json.hd && profile._json.hd === "tothenew.com") {
          return done(null, profile._json);
        // }
        // return done(null, false, { message: "you must use tothenew email" });
      }
    )
  );
  
  passport.serializeUser((user, done) => {
  
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
  
    done(null, obj);
  });

  module.exports = {
      passport
  }