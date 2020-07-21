const db = require("../models");
module.exports = function(app){
    //load index page
    app.get("/", async function(req, res){
        const occupations = await db.Occupation.findAll({raw:true});
        const games = await db.Game.findAll({raw:true})
        res.render("index", {occupations,games});
        
    })
    app.get('/find', async function(req, res){
        var occupations = await db.Occupation.findAll({raw:true});
        var games = await db.Game.findAll({raw:true});
        console.log(req.user)

        res.render('find', {user: req.user, occupations, games})
    })
}