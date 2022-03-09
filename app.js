//referencia: https://github.com/Jossdz/lab-spotify-express



const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");

const bodyParser = require('body-parser'); // middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(__dirname + "\\views");

app.get("/", (req, res, next) => res.render("home"));

app.get("/random", (req, res, next) => res.render("random"));

//app.get("/:buscar", (req, res, next) => res.render("buscar"));

app.get("/buscar/:query", (req, res) => {
    res.render("buscar");
    res.send(req.params);
});

app.get("/contacto", (req, res, next) => res.render("contacto"));

<<<<<<< HEAD
// app.route('/logon')
//     .get(sessionChecker, (req, res) => {
//         //res.sendFile(__dirname + '/public/login.html');
//         res.render("logon");
//     })
//     .post((req, res) => {
//         var username = req.body.username,
//             password = req.body.password;

//         User.findOne({ where: { username: username } }).then(function (user) {
//             if (!user) {
//                 res.redirect('/logon');
//             } else if (!user.validPassword(password)) {
//                 res.redirect('/logon');
//             } else {
//                 req.session.user = user.dataValues;
//                 res.redirect('/home');
//             }
//         });
//     });



app.get('/logon', (req, res, next) => res.render("logon"));


//app.post('/logon', (req, res) => res.send("Logon submitted"));


=======

app.get('/login', (req, res, next) => res.render("login"));

app.post('/login', (req, res) => {
    // Insert Login Code Here
    let username = req.body.username;
    let password = req.body.password;

    if ((username == "admin") && (password == "admin")) {
        res.send("<div align='center'><h2>USUARIO Y CONTRASEÑA CORRECTOS</h2></div>");
    } else {
        res.send("<div align='center'><h2>ERROR</h2></div>");
    }
});
>>>>>>> a03b02324c155f6412e036cbba111e8b9f44b574


app.listen(3000);
