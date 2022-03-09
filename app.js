const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(__dirname + "\\views");

app.get("/", (req, res, next) => res.render("home"));

app.get("/random", (req, res, next) => res.render("random"));

app.get("/buscar", (req, res, next) => res.render("buscar"));

app.get("/contacto", (req, res, next) => res.render("contacto"));

app.listen(3000);
