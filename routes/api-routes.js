
var db = require("../models");
var passport = require("../config/passport");
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(app) {  
  app.get("/api/games", function(req,res){
    db.Game.findAll().then((games)=>{
      const gamesToReturn = games.map((game) => {
        return {
        id: game.game_id,
        name: game.name,
      }; });
        res.json({
          error: false,
          data: games,
    });
    
  })})
  
//build more routes to get data in order to pass into the front end
//get all data into array in order to be used for dropdowns on the frontend
app.get("/api/occupations", function(req,res){
  db.Occupation.findAll().then((occupations)=>{
    const gamesToReturn = occupations.map((occupation) => {
      return {
      id: occupation.id,
      occupation: occupation.occupation,
    }; });
      res.json({
        error: false,
        data: occupations,
  });
  
})})

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    console.log(req.body)

    passport.use(
      'login',
      
      new LocalStrategy(
        {
          usernameField: req.body.email,
          passwordField: req.body.password,
        },
        async (email, password, done) => {
          try {
           
            const user = await UserModel.findOne({
              where: {
                
                email: email,
              },
              include:['games','occuppations']
            });
            if (!user) {
              
              return done(null, false, { message: 'User not found' });
            }
    
            
            const validate = await user.validatePassword(password);
            if (!validate) {
              return done(null, false, { message: 'Wrong Password' });
            }
            
            return done(null, user, { message: 'Logged in Successfully' });
          } catch (error) {
            return done(error);
          }
        }
      )
    );
    
   return res.status(200).json(req.user);
  });

  app.post("/api/signup", function(req, res) { 
    let info = req.body;
    console.log(info, 'here');

    db.User.create({
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
      password: info.password,
      //expect occupation?
      OccupationId: info.OccupationId,
    }).then(function(request, response) {

        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
      
  });
  app.get('/api/find', async (req, res) => {
      const users = await db.User.findAll({raw:true})
      console.log('users:')
      console.log(users.filter(user => user.user_id != req.user.id))
      res.json(users.filter(user => user.user_id != req.user.id))
  })

 
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/user/:id", function(req, res){
    const id = req.params.id;
   db.User.findOne({ where: { user_id: id } }).then((singleUser) => {
  const userToReturn = {
    id: singleUser.id,
    username: singleUser.email,
  };
  res.json({
    error: false,
    data: userToReturn,
    message: "User with requested id",
  });
})});



  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
     
      res.json({});
    } else {
     
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  app.get("/api/findfriends", function(req,res){
    let userid;
      let occupationid = $("#occupationid");
      let gameid = $("#gameid");
        db.findAll({
          attributes: {
            include: [
              [
                sequelize.literal(`(
                          SELECT u.firstName, u.lastName, o.occupation, g.name 
                          FROM users_games ug
                          join users u
                          on ug.user_id = u.user_id
                          join games g
                          on g.game_id = ug.game_id
                          join occupations o
                          on u.occupationid = o.id
                          where u.user_id not in(select user_id from users where u.user_id = ${userid})
                          and occupationid = ${occupationid}
                          and ug.game_id = ${gameid} ;
                      )`),
              ],
            ],
          },
        }
        ).then((friends)=>{
      const friendsToReturn = friends.map((friend) => {
        console.log(friends) });
        res.json({
          error: false,
          data: friends,
    });
  })})
  app.delete("/api/removeFriend", function(req,res){
    let userId = $("#userid") //userlogged in;
    let friendId=$("#user_id") //person user they click to add
      db.User_Friends.destroy({
          attributes: {
            include: [
              [
                sequelize.literal(`(
                  insert into User_Friends (userUserId, friendUserId) values (${userId}, ${friendId}`),
              ],
            ],
          },
        }
        ).then((response)=>{
      console.log(response)
  })})
  app.post("/api/addFriend", function(req,res){
    let userId = $("#userid") //userlogged in;
    let friendId=$("#user_id") //person user they click to add
      db.User_Friends.create({
          attributes: {
            include: [
              [
                sequelize.literal(`(
                  insert into User_Friends (userUserId, friendUserId) values (${userId}, ${friendId}`),
              ],
            ],
          },
        }
        ).then((response)=>{
      console.log(response)
  })})
};
