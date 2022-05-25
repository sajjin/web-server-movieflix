/*
 Authors: Mariah Mirzayan (A01179440), Jasleen Lodhra (A01208987), Sajjin Nijjar (A01055657)
*/
const express = require("express");
const fs = require("fs")

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const names = "Sajjin, Mariah, Jasleen"

app.get("/", (req, res) => res.render("pages/index", {
  movies : ["List empty 😳"],
  name: names
}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let movieList = req.body.movies.split(',');

  res.render("pages/index", {
    movies: movieList,
    name: names});
});

app.get("/myListQueryString", (req, res) => {
  let movie1 = req.query.movie1;
  let movie2 = req.query.movie2;

  res.render('pages/index', {
    movies: [movie1, movie2],
    name: names});
});

app.get("/search/:movieName", (req, res) => {
  let movieName = req.params.movieName;
  fs.readFile("movieDescriptions.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      movieDict = {};
      let lines = data.split("\n")
      for (line of lines) {
        let [title, desc] = line.split(":");
        movieDict[title] = desc;
      }
      if (Object.keys(movieDict).includes(movieName)) {
        res.render("pages/searchResult", {
          title: movieName,
          description: movieDict[movieName],
          link: "Home Page"
        });
      } else {
        res.render("pages/searchResult", {
          title: "Movie could not be found 😢",
          description: "",
          link: "Home Page"
        });
      };
    };
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});