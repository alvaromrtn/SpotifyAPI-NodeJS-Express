/* Referencias:
 * + https://developer.spotify.com/documentation/web-api/reference/#/
 * + https://github.com/thelinmichael/spotify-web-api-node
 * + https://github.com/Jossdz/lab-spotify-express
 */

const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");

const bodyParser = require("body-parser"); //Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(__dirname + "\\views");

app.get("", (req, res, next) => res.render("home"));

app.get("/", (req, res, next) => res.render("home"));

app.get("/buscar", (request, response, next) => {
  response.render("buscar");
});

app.get("/contacto", (req, res, next) => res.render("contacto"));

app.get("/login", (request, response, next) => {
  let data = {
    login: false,
  };
  response.render("login", data);
});

app.post("/login", (request, response, next) => {
  let correo = request.body.correo;
  let contraseña = request.body.contraseña;

  if (correo == "pepe@pepe.com" && contraseña == "Immune12345") {
    let data = {
      login: true,
      code: true,
    };
    response.render("login", data);
  } else {
    let data = {
      login: true,
      code: false, //No autorizado
    };
    response.render("login", data);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////

const SpotifyWebApi = require("spotify-web-api-node");

var spotifyApi = new SpotifyWebApi({
  clientId: "ac60ad5f77514dda91620841b39b1795",
  clientSecret: "c34200f21254435fb884bf56ab5c3bbb",
});

spotifyApi.clientCredentialsGrant().then(
  function (data) {
    spotifyApi.setAccessToken(data.body["access_token"]);
  },
  function (err) {
    console.log("ERROR: Recuperar token de acceso", err);
  }
);

app.get("/artistas", (request, response, next) => {
  spotifyApi.searchArtists(request.query.nombre).then(
    function (data) {
      response.render("artistas", {
        artistas: data.body.artists.items,
      });
    },
    function (err) {
      console.log("ERROR: buscarArtistas", err);
    }
  );
});

app.get("/albumes/:artista", (req, res, next) => {
  spotifyApi.getArtistAlbums(req.params.artista).then(
    function (data) {
      res.render("albumes", {
        albumes: data.body.items,
      });
    },
    function (err) {
      console.log("ERROR: buscarAlbumes", err);
    }
  );
});

app.get("/canciones/:album", (req, res, next) => {
  spotifyApi.getAlbumTracks(req.params.album).then(
    function (data) {
      res.render("canciones", {
        canciones: data.body.items,
      });
    },
    function (err) {
      console.log("ERROR: buscarCanciones", err);
    }
  );
});

app.get("/random", (request, response, next) => {
  var random = "";
  var posible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  random = posible.charAt(Math.floor(Math.random() * posible.length));

  // { limit: 10, offset: 20 } -> range[20...29]
  // Artistas en el rango[50...50]
  spotifyApi.searchArtists(random, { limit: 50, offset: 50 }).then(
    function (data) {
      response.render("artistas", {
        artistas: data.body.artists.items,
      });
    },
    function (err) {
      console.log("ERROR: buscarArtistas", err);
    }
  );
});

////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(function (request, response, next) {
  response.status(404).render("ERROR 404 - Página no encontrada");
});

app.listen(3000);

////////////////////////////////////////////////////////////////////////////////////////////////////

/*
function buscarArtistas(nombreArtista) {
    spotifyApi.searchArtists(nombreArtista)
        .then(function (data) {
            return data.body.artists.items;
        }, function (err) {
            console.log("ERROR: buscarArtistas", err);
        });
}

function buscarAlbumes(idArtista) {
    spotifyApi.getArtistAlbums(idArtista)
        .then(function (data) {
            return data.body.items;
        }, function (err) {
            console.log("ERROR: buscarAlbums", err);
        });
}

function buscarCanciones(idAlbum) {
    spotifyApi.getAlbumTracks(idAlbum)
        .then(function (data) {
            return data.body.items;
        }, function (err) {
            console.log("ERROR: buscarCanciones", err);
        });
}
*/
