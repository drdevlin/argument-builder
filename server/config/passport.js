const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../../db/db.js');
const encrypted = require('../../services/encrypted.js');

const options = { usernameField: 'email', session: false };

const authenticate = (email, password, done) => {
  let user;
  db.read('users', { email })
    .then(result => {
      user = result.rows[0];
      return encrypted(password).matches(user.password)
    })
    .then(matches => {
      if (matches) {
        return done(null, { id: user.id, session_id: user.session_id });
      } else {
        return done(null, false, { message: 'Incorrect password' });
      }
    }) 
    .catch(reason => {
      return done(null, false, { message: reason });
  });
}

module.exports = () => passport.use(new LocalStrategy(options, authenticate));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.read('users', { id })
    .then(result => {
      const user = { id: result.rows[0].id, session_id: result.rows[0].session_id };
      done(null, user);
    })
    .catch(err => done(err));
});