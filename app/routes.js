//there is a bug but can find it so starting over---
module.exports = function (app, passport, db) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection('exam').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user: req.user,
        exam: result
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout(() => {
      console.log('User has logged out!')
    });
    res.redirect('/');
  });

  // message board routes ===============================================================

  app.post('/exam', (req, res) => {
    db.collection('exam')
      .insertOne(req.body)
      .then(result => {
        console.log(result);
        res.redirect('/profile')
      })
      .catch(error => console.log(error))
  })
  /*app.get('/', (req, res) => {
    const cursor = db.collection('verses')
      .find()
      .toArray()
      .then(result => {
        res.render('index.ejs', { verses: results })
        //console.log(results)
      })
      //console.log(cursor);
      .catch(error => console.error(error))
  })*/
  //using https://zellwk.com/blog/crud-express-mongodb/ as a guide for this project
  //note to self: had to go back and compare it to template given in class 
  //note to self: need to do more reasearch do get an alert if wrong or right, thinking of making a conditional? 
  //note to self: I would like the update to do more but for now, it can display the correct answer when ask to check
  //
  app.put('/exam', (req, res) => {
    db.collection('exam')
    .findOneAndUpdate({answerone: req.body.answerone, answertwo: req.body.answertwo, answerthree: req.body.answerthree }, {
      $set: {
        update:req.body.update
        
      }
    }, {
      /*sort: {_id: -1},*/
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })
  //

  app.delete('/exam', (req, res) => {
    db.collection('exam').findOneAndDelete({ answerone: req.body.answerone, answertwo: req.body.answertwo, answerthree: req.body.answerthree }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Answer deleted!')
    })
  })
  //
  /* app.delete('/exam', (req, res) => {
     db.collection('exam').findOneAndDelete({ name: 'Aaliyah' }, (err, result) =>{
       if (err) return res.send(500, err)
         res.send('Deleted Aaliyah quote')
     }) 
   })*/

  //keeping it here in case above does not work 
  /*app.delete('/verses', (req, res) => {
        db.collection('verses').findOneAndDelete({ day: req.body.day, entry: req.body.entry }, (err, result) => {
          if (err) return res.send(500, err)
          res.send('Message deleted!')
        })
      })*/

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}


/*module.exports = function (app, passport, db) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection('exam').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user: req.user,
        exam: result
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout(() => {
      console.log('User has logged out!')
    });
    res.redirect('/');
  });

  // message board routes ===============================================================

  /*app.post('/exam', (req, res) => {
    db.collection('exam')
      .inserOne(req.body)
        /*{ entry: req.body.entry /* answertwo: req.body.answertwo /* answerthree: req.body.answerthree
        (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
  }*/
/*app.post('/exam', (req, res) => {
  db.collection('exam')
    .insertOne(req.body)
    .then(result => {
      console.log(result);
      res.redirect('/profile')
    })
    .catch(error => console.log(error))
})*/

/*app.post('/exam', (req, res) => {
  db.collection('exam').insertOne({ entry: req.body.entry }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/profile')
  })
})

/*app.put('/exam', (req, res) => {
  db.collection('exam')
    .findOneAndUpdate(
      { entry: 'heart' },
      {
        $set: {
          entry: req.body.entry
          //answerone: req.body.answerone,
          //answertwo: req.body.answertwo
        }
      },
      {
        //sort: {_id: -1},
        upsert: true
      },
      (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
})*/

/*app.delete('/exam', (req, res) => {
  db.collection('exam').findOneAndDelete({ entry: 'heart' /* answertwo: req.body.answertwo /*answerthree: req.body.answerthree }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Incorrect answer!')
  })
})*/

/*app.delete('/exam', (req, res) => {
  db.collection('exam').findOneAndDelete({entry: req.body.entry }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Answer deleted!')
  })
})

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

// locally --------------------------------
// LOGIN ===============================
// show the login form
app.get('/login', function (req, res) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

// process the login form
app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/login', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

// SIGNUP =================================
// show the signup form
app.get('/signup', function (req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/signup', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

// local -----------------------------------
app.get('/unlink/local', isLoggedIn, function (req, res) {
  var user = req.user;
  user.local.email = undefined;
  user.local.password = undefined;
  user.save(function (err) {
    res.redirect('/profile');
  });
});

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
if (req.isAuthenticated())
  return next();

res.redirect('/');
}*/
