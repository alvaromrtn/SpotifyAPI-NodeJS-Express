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

app.get("/buscar", (req, res, next) => res.render("buscar"));

app.get("/contacto", (req, res, next) => res.render("contacto"));


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


app.listen(3000);
